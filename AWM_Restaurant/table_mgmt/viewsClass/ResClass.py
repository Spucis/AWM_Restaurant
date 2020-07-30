from .ManagerClass import *

class ResManager(Manager):

    def __call__(self, request):
        self.request = request
        return self.call_check(self.request)

    def do_GET(self):
        tables = {}
        plates = {}
        menu = {}
        orders = {}

        if self.request.user.has_perm('table_mgmt.add_table'):
            tables['can_add'] = True
        if self.request.user.has_perm('table_mgmt.view_table'):
            tables['data'] = Table.objects.all()
            tables['can_view'] = True
            print('[DEBUG] Table {}'.format((tables['data'])))

        if self.request.user.has_perm('table_mgmt.add_plate'):
            plates['can_add'] = True
        if self.request.user.has_perm('table_mgmt.view_plate'):
            plates['data'] = Plate.objects.all()
            plates['can_view'] = True

        if self.request.user.has_perm('table_mgmt.add_menu'):
            menu['can_add'] = True
        if self.request.user.has_perm('table_mgmt.view_menu'):
            try:
                curr_menu = list(Menu.objects.all())
            except Menu.DoesNotExists:
                curr_menu = []

            menu['data'] = curr_menu
            menu['can_view'] = True

        if self.request.user.has_perm('table_mgmt.add_order'):
            orders['can_add'] = True
        if self.request.user.has_perm('table_mgmt.view_order'):
            order_data = []

            if self.request.user.groups.filter(name='admin').exists() or \
               self.request.user.groups.filter(name='waiters').exists():
                print('[DEBUG] ADMIN OR WAITER')
                try:
                    # list() on a QuerySet evaluates it
                    curr_order = list(Order.objects.all())
                except Order.DoesNotExist:
                    curr_order = None
                if curr_order is not None:
                    #order_data.append(curr_order) IMP!!!
                    order_data.extend(curr_order)
                print(order_data)
            else:
                try:
                    curr_order = list(Order.objects.filter(client=self.request.user).all())
                except Order.DoesNotExist:
                    curr_order = None
                print(curr_order)
                if curr_order is not None:
                    order_data.extend(curr_order)
                print(order_data)
            orders['data'] = order_data
            orders['can_view'] = True

        return render(self.request, 'table_mgmt/restaurant.html',{
            'title': 'Main page',
            'content': 'Menu, Tables, Orders, Plates',
            'menu': menu,
            'tables': tables,
            'plates': plates,
            'orders': orders,
        })
