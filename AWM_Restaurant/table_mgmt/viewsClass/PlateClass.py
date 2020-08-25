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

        try:
            #plates = list(Plate.objects.filter(client=request.user.id).all())
            plates = Plate.objects.all()
        except Plate.DoesNotExists:
            # no plates
            return JsonResponse(response)

        for plate in plates:
            serialized_plate = PlateSerializer(plate)
            response['plates'].append(serialized_plate.data)

        # Come mai quegli Header?
        response = JsonResponse(response)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    def do_POST(self):
        plate = PlateForm(self.request.POST)
        if plate.is_valid():
            plate.save()
            return HttpResponseRedirect('/tables')
