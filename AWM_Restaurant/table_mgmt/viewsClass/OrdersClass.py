from .ManagerClass import *

class OrdersManager(Manager):

    def __call__(self, request, order_id=None, table=None, target_hash=None):
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
            return JsonResponse(response)

        # Serializer has been modified and it returns the name of clients and
        # waiters and plates instead of their codes
        for order in orders:
            serialized_order = OrderSerializer(order)
            response['orders'].append(serialized_order.data)

        return JsonResponse(response)
