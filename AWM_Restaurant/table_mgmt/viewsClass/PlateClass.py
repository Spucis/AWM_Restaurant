from .ManagerClass import *

class PlateManager(Manager):

    def __call__(self, request):
        self.request = request
        return self.call_check(self.request)

    def do_GET(self):
        plate = PlateForm()
        return render(self.request, 'table_mgmt/addPlate.html', {
            'form': plate,
        })

    def do_POST(self):
        plate = PlateForm(self.request.POST)
        if plate.is_valid():
            plate.save()
            return HttpResponseRedirect('/tables')
