from django.shortcuts import render
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import Group, User

@login_required
@permission_required('table_mgmt.add_plate', raise_exception=True)
def portal_welcome(request):
    print("ASDA")

    groups = request.user.groups.values_list('name', flat=True).get()
    print(request.user.groups.values_list('name', flat=True).get())
    print(request.user.groups.values())
    if (groups == "Clients"):
        items = {'addiction': 'Clients'}
    else:
        items = {'addiction': 'Other'}

    return render(request, 'portal/index.html', {'request': request, "items" : items})

# Create your views here.
