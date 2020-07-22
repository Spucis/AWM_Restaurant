from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import Table, Plate, Menu
from .forms import *

# Create your views here.
def index(request):
    return render(request, 'table_mgmt/index.html', {
        'title': 'Index page',
        'content': 'Index content (dispatch?)'
    })

def tables(request):
    # if admin, else if client
    tables = Table.objects.all()
    plates = Plate.objects.all()
    menu = Menu.objects.all()

    return render(request, 'table_mgmt/tables.html',{
        'title': 'Tables page',
        'content': 'Tables and plates list',
        'menu': menu,
        'tables': tables,
        'plates': plates
    })

def createMenu(request):
    if request.method == 'POST':
        menuForm = MenuForm(request.POST)
        if menuForm.is_valid():
            menuForm.save()
            return HttpResponseRedirect('/tables')
        else:
            return HttpResponseRedirect('/tables/add/')
    else:
        menuForm = MenuForm()
        return render(request, 'table_mgmt/addMenu.html', {
            'form': menuForm,
            'title': 'Aggiungi tavolo',
            'content': "Aggiungi tavolo",
        })

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

def client(request):
    plates = Plate.objects.all()

    return render(request, 'table_mgmt/createOrder.html', {
        'title': 'Client page',
        'plates': plates
    })

def createOrder(request):
    if request.method == 'POST':
        orderForm = OrderForm(request.POST)
        if orderForm.is_valid():
            orderForm.save()
            return HttpResponseRedirect('/clients')
        else:
            return HttpResponseRedirect('/clients/order/')
    else:
        orderForm = OrderForm()
        return render(request, 'table_mgmt/createOrder.html', {
            'form': orderForm,
            'content': 'Aggiorna Ordine',
        })

def updateOrder(request, code):

    print(code)

    if request.method == 'POST':
        updateorderForm = UpdateOrderForm(request.POST)
        if updateorderForm.is_valid():
            updateorderForm.save()
            return HttpResponseRedirect('/clients')
        else:
            return HttpResponseRedirect('/clients/order/')
    else:
        updateorderForm = UpdateOrderForm()
        return render(request, 'table_mgmt/updateOrder.html', {
            'form': updateorderForm,
            'content': 'Aggiorna Ordine',
        })
