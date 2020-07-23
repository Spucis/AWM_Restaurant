from django.shortcuts import render

from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import permission_required
from .models import *
from .forms import *
from .serializers import *

# Create your views here.

def index(request):
    return render(request, 'table_mgmt/index.html', {
        'title': 'Index page',
        'content': 'Index content (dispatch?)'
    })

def tables(request):
    tables = {}
    plates = {}
    menu = {}
    orders = {}

    if request.user.has_perm('table_mgmt.add_table'):
        tables['can_add'] = True
    if request.user.has_perm('table_mgmt.view_table'):
        tables['data'] = Table.objects.all()
        tables['can_view'] = True

    if request.user.has_perm('table_mgmt.add_plate'):
        plates['can_add'] = True
    if request.user.has_perm('table_mgmt.view_plate'):
        plates['data'] = Plate.objects.all()
        plates['can_view'] = True

    if request.user.has_perm('table_mgmt.add_menu'):
        menu['can_add'] = True
    if request.user.has_perm('table_mgmt.view_menu'):
        menu['data'] = Menu.objects.all()
        menu['can_view'] = True

    if request.user.has_perm('table_mgmt.add_order'):
        orders['can_add'] = True
    if request.user.has_perm('table_mgmt.view_order'):
        orders['data'] = Order.objects.filter(client=request.user)
        orders['can_view'] = True
    
    return render(request, 'table_mgmt/tables.html',{
        'title': 'Main page',
        'content': 'Menu, Tables, Orders, Plates',
        'menu': menu,
        'tables': tables,
        'plates': plates,
        'orders': orders,
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

def client(request):
    plates = Plate.objects.all()

    return render(request, 'table_mgmt/createOrder.html', {
        'title': 'Client page',
        'plates': plates
    })

@permission_required('table_mgmt.change_order', raise_exception=True)
def createOrder(request, table):
    if request.method == 'POST':
        orderForm = OrderForm(request.POST)
        if orderForm.is_valid():
            orderForm.save()
            return HttpResponseRedirect('/tables')
        else:
            print(orderForm.errors)
            return HttpResponseRedirect('/tables/create_order/{}'.format(table))
    else:
        table_obj = Table.objects.get(number=table)
        psw = hash("{}{}".format(table, request.user.username))
        initial = {'table': table_obj, 'client': request.user, 'password': psw}
        orderForm = OrderForm(initial=initial)
        return render(request, 'table_mgmt/createOrder.html', {
            'form': orderForm,
            'content': 'Crea Ordine',
        })

@permission_required('table_mgmt.change_order', raise_exception=True)
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

def listTables(request):
    table = Table(number=3)
    serialized_table = TableSerializer(table)

    return JsonResponse(serialized_table.data)

def listOrders(request):
    order = Order.objects.all().first()
    serialized_order = OrderSerializer(order)

    return JsonResponse(serialized_order.data)