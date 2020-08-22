from .ManagerClass import *

class OrderManager(Manager):

    def __call__(self, request, order_id=None, table=None, target_hash=None):
        #print("ORDER_ID: {}".format(table))
        self.request = request
        self.table = table
        self.order_id = order_id
        self.target_hash = target_hash
        return self.call_check(self.request)


    # GET that return a single order actual state
    @permission_required('table_mgmt.change_order', raise_exception=True)
    def do_GET(self):
        pass

    # POST that create a new Order
    @permission_required('table_mgmt.change_order', raise_exception=True)
    def do_POST(self):
        # New order
        dict_body = json.loads(self.request.body)   # Rerieve jsonified data
        dict_body['client'] = self.request.user.id  # Add client id -> Maybe there is a better way?
        print("username: {}, id: {}".format(self.request.user.username, self.request.user.id))
        q_body = QueryDict('', mutable=True)
        q_body.update(dict_body)
        orderForm = OrderForm(q_body)               # Test sulla data, sempre maggiore di oggi
        if orderForm.is_valid():
            orderForm.save()
            return HttpResponseRedirect('/restaurant')
        else:
            # Gestione errori, tavolo non selezionato etc
            print("The Order form wasn't correct")
            print(q_body)
            print(orderForm.errors)
            return HttpResponseRedirect('/restaurant')

    # update an Order
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
