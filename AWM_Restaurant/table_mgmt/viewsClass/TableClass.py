from .ManagerClass import *


class TableManager(Manager):

    def __call__(self, request, table=None):
        self.request = request
        self.table = table
        return self.call_check(self.request)

    # ADMIN ONLY
    # GET that return form to add table
    def do_GET(self):
        if self.request.user and self.request.user.has_perm('table_mgmt.add_table'):
            tableForm = TableForm()
            return render(self.request, 'table_mgmt/addTable.html', {
                'form': tableForm,
                'title': 'Aggiungi tavolo',
                'content': "Aggiungi tavolo",
            })
        else:
            raise PermissionDenied

    # ADMIN ONLY
    # POST that add a new table
    @permission_required('table_mgmt.add_table', raise_exception=True)
    def do_POST(self):
        # Retrieve jsonified data
        req_body = json.loads(self.request.body)
        resp = {}

        if 'from_ajax' in req_body:
            try:
                table = Table.objects.create(number=int(req_body['table_number']))
                table.save()
                resp = {
                    'resp': "Table successfully created."
                }
                return JsonResponse(resp)
            except:
                resp = {
                    'resp': "Something went wrong while creating the new table. (Already exists?)"
                }
                return JsonResponse(resp, status=500)

        else:
            tableForm = TableForm(self.request.POST)
            if tableForm.is_valid():
                tableForm.save()
                return HttpResponseRedirect('/tables')
            else:
                return HttpResponseRedirect('/tables/add/')

    @permission_required('table_mgmt.delete_table', raise_exception=True)
    def do_DELETE(self):
        """
        Deletes the requested table
        """
        # Retrieve jsonified data
        req_body = json.loads(self.request.body)
        resp = {}

        try:
            table = Table.objects.get(number=req_body['table_number'])
        except Table.DoesNotExist:
            resp = {
                'resp': "Something wrong is happened! The selected table does't exists."
            }
            return JsonResponse(resp)

        try:
            table.delete()
        except:
            resp = {
                'resp': "Something wrong is happened while trying to delete the table."
            }

        resp = {
            'resp': "This table has been successfully deleted!"
        }

        return JsonResponse(resp)

