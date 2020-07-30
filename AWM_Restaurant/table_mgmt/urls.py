"""AWM_Restaurant URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('restaurant/', views.ResClass.ResManager(), name='restaurant'),
    path('tables/', views.TableClass.TableManager(), name='tables'),
    #path('tables/add/', views.addTable, name='addTable'),
    path('plates/', views.PlateClass.PlateManager(), name='addPlate'),
    path('tables/cmenu/', views.createMenu, name='createMenu'),
    path('orders/c/<int:table>/', views.OrderClass.OrderManager(), name='createOrder'),
    path('orders/u/<int:order_id>/', views.OrderClass.OrderManager(), name='updateOrder'),

    # se non specificato il tavolo lascio che si possa creare un ordine
    # senza tavolo collegato in automatico (da inserire manuale dopo)
    #path('tables/create_order/', views.OrderClass.OrderManager(), name='createOrder'),
    #path('tables/create_order/<int:table>/', views.OrderClass.OrderManager(), name='createOrder'),

# API path handler
    path('api/tables', views.listTables, name='listTables'),
    path('api/orders', views.listOrders, name='listOrders'),
]
