from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.decorators import permission_required

from .models import *
from .forms import *
from .serializers import *
from .viewsClass import OrderClass, TableClass, ResClass, PlateClass
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
        try:
            curr_menu = list(Menu.objects.all())
        except Menu.DoesNotExists:
            curr_menu = []

        menu['data'] = curr_menu
        menu['can_view'] = True

    if request.user.has_perm('table_mgmt.add_order'):
        orders['can_add'] = True
    if request.user.has_perm('table_mgmt.view_order'):
        order_data = []

        if request.user.groups.filter(name='admin').exists() or \
           request.user.groups.filter(name='waiters').exists():
            print('[DEBUG] ADMIN OR WAITER')
            try:
                # list() on a QuerySet evaluates it
                curr_order = list(Order.objects.all())
            except Order.DoesNotExist:
                curr_order = None
            if curr_order is not None:
                order_data.append(curr_order)
            print(order_data)
        else:
            try:
                curr_order = list(Order.objects.filter(client=request.user).all())
            except Order.DoesNotExist:
                curr_order = None
            print(curr_order)
            if curr_order is not None:
                order_data.extend(curr_order)
            print(order_data)
        orders['data'] = order_data
        orders['can_view'] = True

    return render(request, 'table_mgmt/restaurant.html',{
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

"""
def listTables(request):
    tables = None
    response = {
        'tables': []
    }

    try:
        tables = list(Table.objects.all())
    except Table.DoesNotExists:
        # no tables
        return JsonResponse(response)

    for table in tables:
        serialized_table = TableSerializer(table)
        response['tables'].append(serialized_table.data)

    return JsonResponse(response)
"""

def listOrders(request):
    orders = None
    response = {
        'orders': []
    }

    # check the permissions of the user
    if not request.user.has_perm('table_mgmt.view_order'):
        print("[DEBUG] Orders API: no permissions to view the orders")
        return JsonResponse(response)

    try:
        orders = list(Order.objects.filter(client=request.user.id).all())
    except Order.DoesNotExists:
        # no orders
        return JsonResponse(response)

    for order in orders:
        serialized_order = OrderSerializer(order)
        response['orders'].append(serialized_order.data)

    return JsonResponse(response)
