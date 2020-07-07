from django.db import models

# Create your models here.
class Table(models.Model):
    number = models.IntegerField(default=0)

class Person(models.Model):
    code = models.AutoField(primary_key=True)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)

class Client(Person):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
