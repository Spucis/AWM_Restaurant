from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.decorators import permission_required

from .models import *
from .forms import *
from .serializers import *
from .viewsClass import OrderClass, OrdersClass, TableClass, TablesClass, ResClass, PlateClass, WaitersClass

def index(request):
    return render(request, 'table_mgmt/index.html', {
        'title': 'Index page',
        'content': 'Index content (dispatch?)'
    })

@permission_required('table_mgmt.add_menu', raise_exception=True)
def createMenu(request):
    if request.method == 'POST':
        menuForm = MenuForm(request.POST)
        if menuForm.is_valid():
            try:
                menuForm.save()
                return HttpResponseRedirect('/tables')
            except ValidationError:
                return render(request, 'table_mgmt/addMenu.html',{
                'form': menuForm,
                'title': 'Aggiungi tavolo',
                'content': "Aggiungi tavolo",
        })
        else:
            return HttpResponseRedirect('/tables/cmenu/')
    else:
        menuForm = MenuForm()
        return render(request, 'table_mgmt/addMenu.html', {
            'form': menuForm,
            'title': 'Aggiungi tavolo',
            'content': "Aggiungi tavolo",
        })

@permission_required('table_mgmt.add_table', raise_exception=True)
def addTable(request):
    if request.method == 'POST':
        tableForm = TableForm(request.POST)
        if tableForm.is_valid():
            tableForm.save()
            return HttpResponseRedirect('/tables')
        else:
            return HttpResponseRedirect('/tables/add/')
    else:
        tableForm = TableForm()
        return render(request, 'table_mgmt/addTable.html', {
            'form': tableForm,
            'title': 'Aggiungi tavolo',
            'content': "Aggiungi tavolo",
        })

@permission_required('table_mgmt.add_plate', raise_exception=True)
def addPlate(request):
    if request.method == 'POST':
        plate = PlateForm(request.POST)
        if plate.is_valid():
            plate.save()
            return HttpResponseRedirect('/tables')
    else:
        plate = PlateForm()
        return render(request, 'table_mgmt/addPlate.html', {
            'form': plate,
        })
