from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Create your models here.
class Table(models.Model):
    number = models.IntegerField(primary_key=True)

    def __str__(self):
        return 'Table {}'.format(self.number)

class Menu(models.Model):
    code = models.AutoField(primary_key=True)
    description = models.CharField(max_length=100)

    def __str__(self):
        return 'Menu {}'.format(self.code)

    def save(self, *args, **kwargs):
        if not self.pk and Menu.objects.exists():
        # if you'll not check for self.pk
        # then error will also raised in update of exists model
            raise ValidationError('There is can be only one JuicerBaseSettings instance')
        return super(Menu, self).save(*args, **kwargs)

    def plates(self):
        return Plate.object.all()

class Plate(models.Model):
    code = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    # Day availability
    monday = models.BooleanField(default=False)
    tuesday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)
    saturday = models.BooleanField(default=False)
    sunday = models.BooleanField(default=False)

    description = models.CharField(max_length=100)
    price = models.FloatField()
    available = models.BooleanField(default=True)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    # Proprietà piatto (vegan etc...)

    @property
    def days(self):
        "Returns the list of the days in which this plate is available"
        days_availability = []
        if self.monday:
            days_availability.append('Monday')
        if self.tuesday:
            days_availability.append('Tuesday')
        if self.wednesday:
            days_availability.append('Wednesday')
        if self.thursday:
            days_availability.append('Thursday')
        if self.friday:
            days_availability.append('Friday')
        if self.saturday:
            days_availability.append('Saturday')
        if self.sunday:
            days_availability.append('Sunday')

        return days_availability

    def __str__(self):
        return 'Plate {}'.format(self.code)

class Order(models.Model):
    #code = models.AutoField(primary_key=True)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    date = models.DateTimeField()
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client')
    waiter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='waiter')
    plates = models.ManyToManyField(Plate)
    password = models.TextField()

    class Meta:
        unique_together = (("table", "date"))

    def __str__(self):
        return 'Order {}'.format(self.code)
"""
class Client(Person):
    name = models.CharField(max_length=50)      # F
    surname = models.CharField(max_length=50)   # F
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return 'Client {}'.format(self.code)

class Client_Auth(Client):
    e_mail = models.EmailField(max_length=254)

    class Meta:
        verbose_name_plural = 'Clients_Auth'

    def __str__(self):
        return 'Client_Auth {}'.format(self.code)
"""


"""
class Prenotation(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE)

class Person(models.Model):
    code = models.AutoField(primary_key=True)

    class Meta:
        verbose_name_plural = 'People'

    def __str__(self):
        return 'Person {}'.format(self.code)

class Waiter(Person):
    # Lista ordini con Query
    name = models.CharField(max_length=50)      # O
    surname = models.CharField(max_length=50)   # O

    def __str__(self):
        return 'Waiter {}'.format(self.code)

class Admin(Person):
    psw = models.CharField(max_length=32)

    def __str__(self):
        return 'Admin {}'.format(self.code)
"""
