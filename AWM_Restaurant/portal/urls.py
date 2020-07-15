from django.urls import path
from . import views

urlpatterns = [
    path('', views.portal_welcome, name='portal_welcome'),
]
