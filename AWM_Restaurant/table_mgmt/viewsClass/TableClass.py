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
        tableForm = TableForm(self.request.POST)
        if tableForm.is_valid():
            tableForm.save()
            return HttpResponseRedirect('/tables')
        else:
            return HttpResponseRedirect('/tables/add/')
