from .ManagerClass import *

class OrderManager(Manager):

    def __call__(self, request, order_id=None, table=None, target_hash=None):
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
        # Retrieve jsonified data
        dict_body = json.loads(self.request.body)
        dict_body['client'] = self.request.user.id  # Add client id -> Maybe there is a better way?

        # Parse data in a structure acceptable from OrderForm
        q_body = QueryDict('', mutable=True)
        q_body.update(dict_body)

        orderForm = OrderForm(q_body)               # !!!! -Test sulla data, sempre maggiore di oggi- !!!!
        if orderForm.is_valid():
            orderForm.save()
            code = hash("{}{}".format(dict_body['client'], dict_body['date']))
            resp = {
                'resp': "The prenotation is signed. You order is the number {}".format(code)
            }
            return JsonResponse(resp)
        else:
            # Catch errors
            print("The Order form wasn't correct")
            print(orderForm.errors)
            return HttpResponseRedirect('/restaurant/')

    # PUT that update an Order
    @permission_required('table_mgmt.change_order', raise_exception=True)
    def do_PUT(self, request, order_id=None):
        order = Order.objects.filter(id=order_id).first()



        """
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
        """
