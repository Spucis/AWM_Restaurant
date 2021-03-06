from django.contrib import admin
from .models import Table, Order, Menu, Plate
# Register your models here.

class PersonAdmin(admin.ModelAdmin):
    pass

class AdminAdmin(admin.ModelAdmin):
    pass

class ClientAdmin(admin.ModelAdmin):
    pass

class ClientAuthAdmin(admin.ModelAdmin):
    pass

class TableAdmin(admin.ModelAdmin):
    pass

class WaiterAdmin(admin.ModelAdmin):
    pass

class OrderAdmin(admin.ModelAdmin):
    pass

class MenuAdmin(admin.ModelAdmin):
    pass

class PlateAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Description', {'fields': [
            'name',
            'description',
            'price',
            #'available',
            'menu',
        ]}),

        ('Days availability',
         {'fields': ['monday',
             'tuesday',
             'wednesday',
             'thursday',
             'friday',
             'saturday',
             'sunday'
            ]}),
    ]
    list_display = ('name', 'code', 'price')

admin.site.register(Table)
admin.site.register(Order)
admin.site.register(Menu)
admin.site.register(Plate, PlateAdmin)
