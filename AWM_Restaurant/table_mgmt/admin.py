from django.contrib import admin
from .models import Person, Admin, Client, Client_Auth, Table, Waiter, Order, Menu, Plate
# Register your models here.

admin.site.register(Person)
admin.site.register(Admin)
admin.site.register(Client)
admin.site.register(Client_Auth)
admin.site.register(Table)
admin.site.register(Waiter)
admin.site.register(Order)
admin.site.register(Menu)
admin.site.register(Plate)
