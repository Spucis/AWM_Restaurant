from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def portal_welcome(request):
    return render(request, 'portal/index.html', {'request': request})

# Create your views here.
