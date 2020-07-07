from django.contrib import admin
from .models import Person, Client, Table
# Register your models here.

admin.site.register(Person)
admin.site.register(Client)
admin.site.register(Table)
