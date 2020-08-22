from .ManagerClass import *

class WaitersManager(Manager):

    def __call__(self, request, order_id=None, table=None, target_hash=None):
        self.request = request
        self.table = table
        self.order_id = order_id
        self.target_hash = target_hash
        return self.call_check(self.request)


    # GET that return a list of waiters
    @permission_required('table_mgmt.view_order', raise_exception=True)
    def do_GET(self):
        waiters = None
        response = {
            'waiters': []
        }

        # check the permissions of the user
        if not self.request.user.has_perm('table_mgmt.view_order'):
            print("[DEBUG] Orders API: no permissions to view the orders")
            return JsonResponse(response)

        try:
            group = Group.objects.get(name='waiters')
            waiters = group.user_set.all()
        except Exception as Err: # Maybe set a specific except
            print(Err)
            return JsonResponse(response)

        for waiter in waiters:
            serialized_waiters = WaiterSerializer(waiter)
            response['waiters'].append(serialized_waiters.data)

        print("Response: {}".format(response))

        return JsonResponse(response)


