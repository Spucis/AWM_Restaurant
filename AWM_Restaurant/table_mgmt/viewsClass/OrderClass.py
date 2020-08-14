from .ManagerClass import *

class OrderManager(Manager):

    def __call__(self, request, order_id=None, table=None, target_hash=None):
        print("ORDER_ID: {}".format(table))
        self.request = request
        self.table = table
        self.order_id = order_id
        self.target_hash = target_hash
        return self.call_check(self.request)


    # getOrder GET
    @permission_required('table_mgmt.change_order', raise_exception=True)
    def do_GET(self):
        request = self.request
        """
        if self.order_id != None:
            curr_order = Order.objects.filter(id=self.order_id).first()
            if curr_order is None:
                # requested order not found
                print("[DEBUG] requested order not found")
                return HttpResponseRedirect("/restaurant")
            print(list(curr_order.plates.all()))
            initial = {
                    'plates': [plate for plate in list(Plate.objects.all()) if plate in list(curr_order.plates.all())]
            }
            print(initial)
            orderForm = UpdateOrderForm(initial=initial)
            method = 'POST'

            html = "update"

        if self.table != None:
            table_obj = Table.objects.get(number=self.table)
            psw = hash("{}{}".format(int(self.table) , str(self.request.user.username)))
            print(psw)
            initial = {'table': table_obj, 'client': self.request.user, 'password': psw}
            orderForm = OrderForm(initial=initial)
            method = 'POST'

            html = 'create'

        return render(self.request, 'table_mgmt/{}Order.html'.format(html), {
            'form': orderForm,
            'content': 'Ordine',
            'form_method': method
        })
        """
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
            """ Serializer has been modified and it returns the name of clients and waiters and plates
            instead of their codes"""
            """
            curr_client = User.objects.filter(id=order.client.id).first()
            ser_order = serialized_order.data.copy()
            print(curr_client)
            if curr_client:
                ser_order['client_username'] = curr_client.username
                print(ser_order)
            else:
                ser_order['client_username'] = ""
            response['orders'].append(ser_order)
            """
            response['orders'].append(serialized_order.data)
        print(response['orders'])
        return JsonResponse(response)

    # createOrder POST
    @permission_required('table_mgmt.change_order', raise_exception=True)
    def do_POST(self):
        # New order
        #if self.target_hash is None:
        orderForm = OrderForm(self.request.POST)
        if orderForm.is_valid():
            orderForm.save()
            return HttpResponseRedirect('/restaurant')
        else:
            print(orderForm.errors)
            return HttpResponseRedirect('/orders/c/{}/'.format(self.table))

    # updateOrder PUT
    @permission_required('table_mgmt.change_order', raise_exception=True)
    def do_PUT(self, request, order_id=None):
        order = Order.objects.filter(id=order_id).first()
        if order:
            print(request.PUT['plates'])
            if request.PUT['plates'] and len(request.PUT['plates']) > 0:
                for plate_id in request.PUT['plates']:
                    plate = Plate.objects.filter(code=plate_id).first()
                    if plate:
                        order.plates.add(plate)
                    else:
                        # plate with such id not found... WHY?
                        print("[DEBUG] Requested plate {} not found".format(plate_id))
                        return HttpResponseRedirect("/tables")
                order.save()
                # correct, updated the order then redirect to tables
                return HttpResponseRedirect("/restaurant")
            else:
                # no plates to add
                return HttpResponseRedirect("/restaurant")
        else:
            # order not found
            print("[DEBUG] Order not found")
            return HttpResponseRedirect('/restaurant')