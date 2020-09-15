from django.shortcuts import render
from django.contrib.auth.decorators import login_required, permission_required
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import Group, User

@login_required
def portal_welcome(request):
    groups = request.user.groups.values_list('name', flat=True).get()

    if (groups == "clients"):
        items = {'addiction': 'Clients'}
    else:
        items = {'addiction': 'Other'}

    return render(request, 'portal/index.html', {'request': request, "items" : items})

# Create your views here.
