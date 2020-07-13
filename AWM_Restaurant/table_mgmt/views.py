from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

from .models import Table, Plate
from .forms import *

# Create your views here.
def index(request):
    return render(request, 'table_mgmt/index.html', {
        'title': 'Index page',
        'content': 'Index content (dispatch?)'
    } )

def tables(request):
    tables = Table.objects.all()
    plates = Plate.objects.all()
    return render(request, 'table_mgmt/tables.html',{
        'title': 'Tables page',
        'content': 'Tables and plates list',
        'tables': tables,
        'plates': plates,
    })

def addTable(request):
    if request.method == 'POST':
        tableForm = TableForm(request.POST)
        if tableForm.is_valid():
            tableForm.save()
            return HttpResponseRedirect('/tables')
    else:
        tableForm = TableForm()
        return render(request, 'table_mgmt/addTable.html', {
            'form': tableForm,
            'title': 'Aggiungi tavolo',
            'content': "Aggiungi tavolo",
        })

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
