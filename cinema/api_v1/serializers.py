from webapp.models import Movie, Category, Hall, Seat, Show, Discount, Ticket, Reservation
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:category-detail')

    class Meta:
        model = Category
        fields = ('url', 'id', 'name', 'description')


class InlineCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class MovieSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:movie-detail')
    # genre = InlineCategorySerializer(many=True)

    class Meta:
        model = Movie
        fields = ('url', 'id', 'name', 'genre','description', 'poster', 'release_date', 'finish_date')


class InlineMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('name')

class HallSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:hall-detail')

    class Meta:
        model = Hall
        fields = ('url', 'id', 'name')


class SeatSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:seat-detail')
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', source='hall', read_only=True)

    class Meta:
        model = Seat
        fields = ('url', 'id', 'hall', 'hall_url', 'row', 'place')


class InlineSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('hall', 'row', 'place')


class ShowSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:show-detail')
    film_url = serializers.HyperlinkedRelatedField(view_name='api_v1:movie-detail', source='film', read_only=True)
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', source='hall', read_only=True)
    # film = InlineMovieSerializer(many=True, read_only=True)

    class Meta:
        model = Show
        fields = ('url', 'id', 'film', 'film_url', 'hall', 'hall_url', 'start', 'finish', 'price')


class InlineShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ('film', 'price')


class DiscountSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:discount-detail')

    class Meta:
        model = Discount
        fields = ('url', 'id', 'name', 'discount', 'discount_start', 'discount_finish')


class InlineDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ('name', 'discount')


class TicketSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:ticket-detail')
    # discount = InlineDiscountSerializer(many=True, read_only=True)
    # show = InlineShowSerializer(many=True, read_only=True)
    # seat = InlineSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ('url', 'show', 'seat', 'discount', 'return_ticket')


class ReservationSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:reservation-detail')
    # seats = InlineSeatSerializer(many=True, read_only=True)
    # show = InlineShowSerializer(many=True, read_only=True)

    class Meta:
        model = Reservation
        fields = ('url', 'id', 'show', 'seats', 'status', 'created_at', 'changed_at')
