from .ManagerClass import *

class OrdersManager(Manager):

    def __call__(self, request, order_id=None, table=None, target_hash=None):
        # print("ORDER_ID: {}".format(table))
        self.request = request
        self.table = table
        self.order_id = order_id
        self.target_hash = target_hash
        return self.call_check(self.request)

    # GET that return the list of Orders
    @permission_required('table_mgmt.change_order', raise_exception=True)
    def do_GET(self):
        request = self.request
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
        # print(response['orders'])
        return JsonResponse(response)
