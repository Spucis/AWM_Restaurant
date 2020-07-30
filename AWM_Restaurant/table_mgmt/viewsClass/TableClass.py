from .ManagerClass import *

class TableManager(Manager):

    def __call__(self, request, table=None):
        self.request = request
        self.table = table
        return self.call_check(self.request)

    @permission_required('table_mgmt.add_table', raise_exception=True)
    def do_GET(self):
        tableForm = TableForm()
        return render(self.request, 'table_mgmt/addTable.html', {
            'form': tableForm,
            'title': 'Aggiungi tavolo',
            'content': "Aggiungi tavolo",
        })

    @permission_required('table_mgmt.add_table', raise_exception=True)
    def do_POST(self):
        tableForm = TableForm(self.request.POST)
        if tableForm.is_valid():
            tableForm.save()
            return HttpResponseRedirect('/tables')
        else:
            return HttpResponseRedirect('/tables/add/')

    @permission_required('table_mgmt.change_table', raise_exception=True)
    def do_PUT(self, request):
        pass

    def do_DELETE(self, request):
        pass
