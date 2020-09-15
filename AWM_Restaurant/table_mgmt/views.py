from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.decorators import permission_required
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

import json

from .models import *
from .forms import *
from .serializers import *
from .viewsClass import OrderClass, OrdersClass, TableClass, TablesClass, ResClass, PlatesClass, WaitersClass, UserClass, LoginClass

def index(request):
    return HttpResponseRedirect('/restaurant')

def handle_page_not_found(request, exception):
    return HttpResponseRedirect('/restaurant')

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

def get_csrf_token(request):
    if request.method == 'GET':
        return JsonResponse({'csrf_token' : get_token(request)})

@csrf_exempt
def mobile_order(request):
    if request.method == 'POST':
        # Retrieve jsonified data
        req_body = json.loads(request.body)

        order = Order.objects.get(password=req_body['orderCode'])
        if order:
            """
            plates = []
            for plate in order.plates.all():
                plates.append(PlateSerializer(plate).data)

            resp = {
                'resp': "Your Order has been successfully been retrieved!",
                'plates': plates,
            }
            """

            serialized_order = OrderSerializer(order)
            resp = {
                'resp': 'Your order has been successfully been retrieved!',
                'order': serialized_order.data
            }
            return JsonResponse(resp)
        else:
            resp = {
                'resp': "Something wrong is happened! The selected order does't exists."
            }
            return JsonResponse(resp)

    elif request.method == 'PUT':
        """ UPDATE THE ORDER """
        # Retrieve jsonified data
        req_body = json.loads(request.body)
        resp = {}

        try:
            order = Order.objects.get(password=req_body['order_id'])
        except Order.DoesNotExist:
            resp = {
                'resp': "Something wrong is happened! The selected password does't exists."
            }
            return JsonResponse(resp)

        if req_body['plates'] and len(req_body['plates']) > 0:
            for plate_id, quantity in req_body['plates'].items():
                try:
                    plate = Plate.objects.get(code=plate_id)
                except Plate.DoesNotExist:
                    resp = {
                        'plate_id': plate_id
                    }
                platedetails = PlateDetails.objects.filter(plate=plate_id, order=order.id).first()
                if not platedetails:
                    order.plates.add(plate)
                    platedetails = PlateDetails.objects.get(plate=plate_id, order=order.id)
                platedetails.quantity += int(quantity)
                platedetails.save()
            order.save()
        resp = {
            'resp': "Your Order has been successfully updated!"
        }

        return JsonResponse(resp)
