from .ManagerClass import *
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class PlatesManager(Manager):

    def __call__(self, request):
        self.request = request
        return self.call_check(self.request)


    # GET that returns a list of plates
    # Per questo metodo non è richiesto il CSRF
    @method_decorator(csrf_exempt)
    def do_GET(self):
        request = self.request

        plates = None
        response = {
            'plates': []
        }

        try:
            plates = Plate.objects.all()
        except Plate.DoesNotExists:
            return JsonResponse(response)

        for plate in plates:
            serialized_plate = PlateSerializer(plate)
            response['plates'].append(serialized_plate.data)

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
