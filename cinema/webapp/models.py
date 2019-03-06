from django.db import models
import uuid


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)

    def __str__(self):
        return self.name


class Movie(models.Model):
    name = models.CharField(max_length=255)
    genre = models.ManyToManyField(Category, related_name='movie_category')
    description = models.TextField(max_length=2000, null=True, blank=True)
    poster = models.ImageField(upload_to='posters', null=True, blank=True)
    release_date = models.DateField()
    finish_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Hall(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Seat(models.Model):
    hall = models.ForeignKey(Hall, related_name='hall_name', on_delete=models.PROTECT)
    row = models.CharField(max_length=255)
    place = models.CharField(max_length=255)

    def __str__(self):
        return 'Зал %s, ряд %s, место %s' %(self.hall, self.row, self.place)


class Show(models.Model):
    film = models.ForeignKey(Movie, related_name='show_name', on_delete=models.PROTECT)
    hall = models.ForeignKey(Hall, related_name='show_hall', on_delete=models.PROTECT)
    start = models.DateTimeField(null=True, blank=True)
    finish = models.DateTimeField(null=True, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return 'Сеанс %s, зал %s, начало %s' %(self.film, self.hall, self.start)


class Discount(models.Model):
    name = models.CharField(max_length=255)
    discount = models.IntegerField()
    discount_start = models.DateTimeField(null=True, blank=True)
    discount_finish = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return '%s - %s процентов' % (self.name, self.discount)


class Ticket(models.Model):
    show = models.ForeignKey(Show, related_name='ticket_show', on_delete=models.PROTECT)
    seat = models.ForeignKey(Seat, related_name='ticket_seat', on_delete=models.PROTECT)
    discount = models.ForeignKey(Discount, null=True, blank=True, related_name='ticket_discount', on_delete=models.PROTECT)
    return_ticket = models.BooleanField(default=False)

    def __str__(self):
        return 'Номер билета %s, сеанс %s' % (self.id, self.show)


class Reservation(models.Model):
    STATUS_NEW = 'Создано'
    STATUS_BOUGHT_OUT = 'Выкуплено'
    STATUS_CANCELED = 'Отмена'

    STATUS_CHOICES = (
        (STATUS_NEW, 'Новый'),
        (STATUS_BOUGHT_OUT, 'Выкуплено'),
        (STATUS_CANCELED, 'Отмена')
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    show = models.ForeignKey(Show, related_name='reservation_show', on_delete=models.PROTECT)
    seats = models.ManyToManyField(Seat, related_name='reservation_seats')
    status = models.CharField(max_length=255, default=STATUS_NEW, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    changed_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Код брони %s, статус %s' % (self.id, self.status)
