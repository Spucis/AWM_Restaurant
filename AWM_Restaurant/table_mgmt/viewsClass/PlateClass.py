from .ManagerClass import *
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class PlateManager(Manager):

    def __call__(self, request):
        self.request = request
        return self.call_check(self.request)

    # TODO non si potrebbe passare anche la 'request' nella chiamata a funzione? Così rimarrebbe tutto uguale a prima?
    @method_decorator(csrf_exempt)
    def do_GET(self):
        request = self.request
        """
        plate = PlateForm()
        return render(self.request, 'table_mgmt/addPlate.html', {
            'form': plate,
        })
        """

        plates = None
        response = {
            'plates': []
        }
        # check the permissions of the user
        """
        if not request.user.has_perm('table_mgmt.view_plate'):
            print("[DEBUG] PLATES API: no permissions to view the plates")
            return JsonResponse(response)
        """
        try:
            #plates = list(Plate.objects.filter(client=request.user.id).all())
            plates = Plate.objects.all()
        except Plate.DoesNotExists:
            # no plates
            return JsonResponse(response)

        for plate in plates:
            serialized_plate = PlateSerializer(plate)
            response['plates'].append(serialized_plate.data)

        response = JsonResponse(response)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Max-Age"] = "1000"
        response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return response

    def do_POST(self):
        plate = PlateForm(self.request.POST)
        if plate.is_valid():
            plate.save()
            return HttpResponseRedirect('/tables')
