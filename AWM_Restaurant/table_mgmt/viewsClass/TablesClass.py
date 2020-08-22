from .ManagerClass import *

class TablesManager(Manager):

    def __call__(self, request, table=None):
        self.request = request
        self.table = table
        return self.call_check(self.request)

    # GET that return a list of tables
    def do_GET(self):
    # self.request.user.has_perm('table_mgmt.view_table'):
        tables = None
        response = {
            'tables': []
        }

        try:
            tables = list(Table.objects.all())
        except Table.DoesNotExists:
            # no tables
            return JsonResponse(response)

        for table in tables:
            serialized_table = TableSerializer(table)
            response['tables'].append(serialized_table.data)

        return JsonResponse(response)

