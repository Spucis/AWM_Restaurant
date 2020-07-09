from django.shortcuts import render
from django.http import HttpResponse

from .models import Table, Plate

# Create your views here.
def index(request):
    return render(request, 'table_mgmt/index.html', {
        'title': 'Index page',
        'content': 'Index content (dispatch?)'
    } )

def tables(request):
    tables = Table.objects.all()
    plates = Plate.objects.all()
    return render(request, 'table_mgmt/tables.html',{
        'title': 'Tables page',
        'content': 'Tables and plates list',
        'tables': tables,
        'plates': plates,
    })