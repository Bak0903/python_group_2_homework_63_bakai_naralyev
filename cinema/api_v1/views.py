from webapp.models import Movie, Category, Hall, Seat, Show, Discount, Ticket, Reservation
from rest_framework import viewsets
from api_v1.serializers import  MovieSerializer, CategorySerializer, HallSerializer, SeatSerializer, ShowSerializer,\
                                DiscountSerializer, TicketSerializer, ReservationSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User


class UserCreateView(CreateAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



class BaseViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        permissions = super().get_permissions()

        if self.request.method in ["POST", "DELETE", "PUT", "PATCH"]:
            permissions.append(IsAuthenticated())
        return permissions


class MovieViewSet(BaseViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer


class CategoryViewSet(BaseViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class HallViewSet(BaseViewSet):
    queryset = Hall.objects.all().order_by('name')
    serializer_class = HallSerializer


class SeatViewSet(BaseViewSet):
    queryset = Seat.objects.all().order_by('hall', 'place')
    serializer_class = SeatSerializer


class ShowViewSet(BaseViewSet):

    queryset = Show.objects.all()
    serializer_class = ShowSerializer

    def get_queryset(self):
        queryset = self.queryset
        movie_id = self.request.query_params.get('movie_id', None)
        hall_id = self.request.query_params.get('hall_id', None)
        starts_after = self.request.query_params.get('starts_after', None)
        starts_before = self.request.query_params.get('starts_before', None)

        if movie_id:
            queryset = queryset.filter(film_id=movie_id)
        if hall_id:
            queryset = queryset.filter(hall_id=hall_id).order_by('hall')
        if starts_after:
            queryset = queryset.filter(start__gte=starts_after)
        if starts_before:
            queryset = queryset.filter(start__lte=starts_before)
        return queryset


class DiscountViewSet(BaseViewSet):
    queryset = Discount.objects.all().order_by('id')
    serializer_class = DiscountSerializer


class TicketViewSet(BaseViewSet):
    queryset = Ticket.objects.all().order_by('id')
    serializer_class = TicketSerializer


class ReservationViewSet(BaseViewSet):
    queryset = Reservation.objects.all().order_by('id')
    serializer_class = ReservationSerializer
