from django.db import models


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