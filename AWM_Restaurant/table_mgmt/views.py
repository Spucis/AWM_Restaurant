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
def createOrder(request, table=None, order_id=None, target_hash=None):
    if request.method == 'POST':
        # New order
        if target_hash is None:
            orderForm = OrderForm(request.POST)
            if orderForm.is_valid():
                orderForm.save()
                return HttpResponseRedirect('/tables')
            else:
                print(orderForm.errors)
                return HttpResponseRedirect('/tables/create_order/{}'.format(table))
        else:
            # UPDATE the order
            order = Order.objects.filter(id=order_id).first()
            if order:
                print(request.POST['plates'])
                if request.POST['plates'] and len(request.POST['plates']) > 0:
                    for plate_id in request.POST['plates']:
                        plate = Plate.objects.filter(code=plate_id).first()
                        if plate:
                            order.plates.add(plate)
                        else:
                            # plate with such id not found... WHY?
                            print("[DEBUG] Requested plate {} not found".format(plate_id))
                            return HttpResponseRedirect("/tables")
                    order.save()
                    # correct, updated the order then redirect to tables
                    return HttpResponseRedirect("/tables")
                else:
                    # no plates to add
                    return HttpResponseRedirect("/tables")
            else:
                # order not found
                print("[DEBUG] Order not found")
                return HttpResponseRedirect('/tables')
    elif request.method == 'GET':
        # se è stato specificato un tavolo,
        # si imposta il form adeguatamente,
        # altrimenti form unbound
        if table is None:
            orderForm = OrderForm()
            method = 'POST'

            # se non è stata passata una target_hash significa che
            # non si è in fase di aggiornamento di un ordine
            if target_hash is not None and order_id is not None:
                target_hash = int(target_hash)

                curr_order = Order.objects.filter(id=order_id).first()
                print(curr_order)
                if curr_order is None:
                    # requested order not found
                    print("[DEBUG] requested order not found")
                    return HttpResponseRedirect("/tables")
                """
                print("[DEBUG] {}\n\t{}".format(hash("{}{}".format(int(curr_order.table.number), request.user.username)),
                                              target_hash))
                print("HASH: {}".format(hash("1cliente1")))
                print("[DEBUG] table: {}".format(curr_order.table.number))
                print("[DEBUG] username: {}".format(request.user.username))
                if hash("{}{}".format(int(curr_order.table.number), request.user.username)) == target_hash:
                    initial = {
                            'table': curr_order.table,
                            'client': curr_order.client,
                            'password': curr_order.password,
                            'date': curr_order.date,
                            'waiter': curr_order.waiter,
                            'plates': curr_order.plates
                    }
                    orderForm = OrderForm(initial=initial)
                    method = 'PUT'
                else:
                    # hash don't match
                    print("[DEBUG] hash don't match")
                    return HttpResponseRedirect("/tables")
                """
                # tolto il controllo con l'hash, dà valori diversi per elementi uguali
                # quando si riavvia il server... perché? TODO
                print(list(curr_order.plates.all()))
                initial = {
                    'plates': [plate for plate in list(Plate.objects.all()) if plate in list(curr_order.plates.all())]
                }
                print(initial)
                orderForm = UpdateOrderForm(initial=initial)
                method = 'POST'
        else:
            table_obj = Table.objects.get(number=table)
            psw = hash("{}{}".format(int(table), str(request.user.username)))
            print(psw)
            initial = {'table': table_obj, 'client': request.user, 'password': psw}
            orderForm = OrderForm(initial=initial)
            method = 'POST'

        return render(request, 'table_mgmt/createOrder.html', {
            'form': orderForm,
            'content': 'Ordine',
            'form_method': method
        })


@permission_required('table_mgmt.change_order', raise_exception=True)
def updateOrder(request, target_hash):

    print(target_hash)
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