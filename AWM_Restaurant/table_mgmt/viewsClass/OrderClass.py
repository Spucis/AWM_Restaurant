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
        req_body = json.loads(self.request.body)
        req_body['client'] = self.request.user.id  # Add client id -> Maybe there is a better way?

        # Generating hash for the order
        req_body['password'] = "{}".format(hash("{}{}".format(req_body['client'], req_body['date'])))

        # Parse data in a structure acceptable from OrderForm
        q_body = QueryDict('', mutable=True)
        q_body.update(req_body)

        orderForm = OrderForm(q_body)               # !!!! -Test sulla data, sempre maggiore di oggi- !!!!
        if orderForm.is_valid():
            orderForm.save()
            resp = {
                'resp': "The prenotation is signed. You order is the number {}".format(req_body['password'])
            }
            return JsonResponse(resp)
        else:
            # Catch errors
            print("The Order form wasn't correct")
            print(orderForm.errors)
            return HttpResponseRedirect('/restaurant/')

    # PUT that update an Order
    @permission_required('table_mgmt.change_order', raise_exception=True)
    def do_PUT(self):
        # Retrieve jsonified data
        req_body = json.loads(self.request.body)

        order = Order.objects.get(id=req_body['order_id'])
        if order:
            if req_body['plates'] and len(req_body['plates']) > 0:
                for plate_id in req_body['plates']:
                    plate = Plate.objects.get(code=plate_id)
                    if plate:
                        order.plates.add(plate)
                    #else: SECONDO ME NON PUÒ ACCADERE
                        # plate with such id not found... WHY?
                        #print("[DEBUG] Requested plate {} not found".format(plate_id))
                        #return HttpResponseRedirect("/tables")
                order.save()
            resp = {
                    'resp': "Your Order has been successfully updated!"
            }
            return JsonResponse(resp)
        else:
            resp = {
                    'resp': "Something wrong is happened! The selected order does't exists."
            }
            return JsonResponse(resp)

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
