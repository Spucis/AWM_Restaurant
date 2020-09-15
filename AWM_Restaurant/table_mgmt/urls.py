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
    path('restaurantAdmin/', views.ResClass.ResManager(), name='restaurant_admin'),
    path('tables/cmenu/', views.createMenu, name='createMenu'),
    path('orders/c/<int:table>/', views.OrderClass.OrderManager(), name='createOrder'),
    path('orders/u/<int:order_id>/', views.OrderClass.OrderManager(), name='updateOrder'),

    # API path handler
    path('restaurant/login', views.LoginClass.LoginManager(), name='loginUser'),
    path('restaurant/createUser', views.UserClass.UserManager(), name='createUser'),
    path('restaurant/order', views.OrderClass.OrderManager(), name='Order'),
    path('restaurant/tables', views.TablesClass.TablesManager(), name='listTables'),
    path('restaurant/orders', views.OrdersClass.OrdersManager(), name='listOrders'),
    path('restaurant/waiters', views.WaitersClass.WaitersManager(), name='listWaiters'),
    path('restaurant/plates', views.PlatesClass.PlatesManager(), name='listPlates'),
    path('restaurant/table', views.TableClass.TableManager(), name='table'),

    # Api path handler mobile
    path('restaurant/csrftoken', views.get_csrf_token, name='getToken'),
    path('restaurant/m/order', views.mobile_order, name='mobileOrder'),
]

handler404 = 'table_mgmt.views.handle_page_not_found'
