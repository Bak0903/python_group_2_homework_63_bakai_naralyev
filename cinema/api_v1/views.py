from django.shortcuts import render
from webapp.models import Movie, Category, Hall, Seat, Show, Discount, Ticket, Reservation
from rest_framework import viewsets
from api_v1.serializers import  MovieSerializer, CategorySerializer, HallSerializer, SeatSerializer, ShowSerializer,\
                                DiscountSerializer, TicketSerializer, ReservationSerializer


class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []


class MovieViewSet(NoAuthModelViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer


class CategoryViewSet(NoAuthModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class HallViewSet(NoAuthModelViewSet):
    queryset = Hall.objects.all().order_by('name')
    serializer_class = HallSerializer


class SeatViewSet(NoAuthModelViewSet):
    queryset = Seat.objects.all().order_by('hall', 'place')
    serializer_class = SeatSerializer


class ShowViewSet(NoAuthModelViewSet):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer

    def get_queryset(self):
        queryset = self.queryset
        movie_id = self.request.query_params.get('movie_id', None)
        starts_after = self.request.query_params.get('starts_after', None)
        starts_before = self.request.query_params.get('starts_before', None)

        if movie_id:
            queryset = queryset.filter(film_id=movie_id)
        if starts_after:
            queryset = queryset.filter(start__gte=starts_after)
        if starts_before:
            queryset = queryset.filter(start__lte=starts_before)
        return queryset


class DiscountViewSet(NoAuthModelViewSet):
    queryset = Discount.objects.all().order_by('id')
    serializer_class = DiscountSerializer


class TicketViewSet(NoAuthModelViewSet):
    queryset = Ticket.objects.all().order_by('id')
    serializer_class = TicketSerializer


class ReservationViewSet(NoAuthModelViewSet):
    queryset = Reservation.objects.all().order_by('id')
    serializer_class = ReservationSerializer
