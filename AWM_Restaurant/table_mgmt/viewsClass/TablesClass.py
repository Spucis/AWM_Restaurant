from .ManagerClass import *

class TablesManager(Manager):

    def __call__(self, request, table=None):
        self.request = request
        self.table = table
        return self.call_check(self.request)

    # GET that return a list of tables
    @permission_required('table_mgmt.view_table', raise_exception=True)
    def do_GET(self):
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

        response['user'] = {}
        response['user']['username'] = UserSerializer(self.request.user).data

        # given all the permissions of the current user, only some of them (the following) are
        # available to be sent in output as response (only if the user has the permission)
        # no duplicates
        available_permissions = [
            "delete_table",
            "add_table"
        ]
        permissions = []
        for x in self.request.user.groups.all():
            permissions.extend([permission for permission in GroupSerializer(x).data['permissions']
                                if permission in available_permissions and permission not in permissions])

        response['user']['permissions'] = permissions
        return JsonResponse(response)

