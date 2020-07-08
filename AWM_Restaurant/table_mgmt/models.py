from django.db import models
from django.forms import PasswordInput

# Create your models here.
class Table(models.Model):
    number = models.IntegerField(default=0)

class Person(models.Model):
    code = models.AutoField(primary_key=True)

class Waiter(Person):
    # Lista ordini con Query
    name = models.CharField(max_length=50)      # O
    surname = models.CharField(max_length=50)   # O

class Admin(Person):
    psw = models.CharField(max_length=32)

class Order(models.Model):
    code = models.AutoField(primary_key=True)
    t_code = models.ForeignKey(Table, on_delete=models.CASCADE)
    waiter = models.ForeignKey(Waiter, on_delete=models.CASCADE)
    time = models.DateTimeField()
    plates = {}

class Client(Person):
    name = models.CharField(max_length=50)      # F
    surname = models.CharField(max_length=50)   # F
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

class Client_Auth(Client):
    e_mail = models.EmailField(max_length=254)

class Menu(models.Model):
    day = models.CharField(max_length=20)

class Plate(models.Model):
    code = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    days = []
    description = models.CharField(max_length=100)
    price = models.FloatField()
    available = models.BooleanField()
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    # Proprietà piatto (vegan etc...)



