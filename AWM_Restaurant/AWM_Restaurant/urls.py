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
from django.urls import path, include
from . import views

urlpatterns = [
    path('', include(('table_mgmt.urls', 'table_mgmt'), namespace='table_mgmt')),
    path('portal/', include('portal.urls')),
    path('admin/', admin.site.urls),
    path('logout/', views.logout_view, name='logout_view'),
    path('', include('django.contrib.auth.urls')),
    path('restaurant/', include(('frontend.urls', 'frontend'), namespace='frontend')),
]

handler404 = 'table_mgmt.views.handle_page_not_found'

