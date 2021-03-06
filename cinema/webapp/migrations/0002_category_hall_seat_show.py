# Generated by Django 2.1.7 on 2019-03-04 06:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, max_length=2000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Hall',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Seat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('row', models.CharField(max_length=255)),
                ('place', models.CharField(max_length=255)),
                ('hall', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='hall_name', to='webapp.Hall')),
            ],
        ),
        migrations.CreateModel(
            name='Show',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField(blank=True, null=True)),
                ('finish', models.DateTimeField(blank=True, null=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=4)),
                ('film', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='show_name', to='webapp.Movie')),
                ('hall', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='show_hall', to='webapp.Movie')),
            ],
        ),
    ]
