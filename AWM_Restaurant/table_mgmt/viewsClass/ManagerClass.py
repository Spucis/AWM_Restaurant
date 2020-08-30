import json
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotAllowed, JsonResponse, QueryDict
from django.contrib.auth.decorators import permission_required, user_passes_test
from django.contrib.auth.models import User, Group, AnonymousUser
from django.core.exceptions import PermissionDenied
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from ..models import *
from ..forms import *
from ..serializers import *

def check_group(user):
    if user.groups.filter(name='admin').exists() or user.groups.filter(name='waiters').exists():
        return True
    else:
        return False

class Manager:

    def call_check(self, request):
        # Look up the user and throw a 404 if it doesn't exist
        # TOLTO UN ATTIMO PER CONTOLLARE ANCHE SENZA UTENTE
        #self.user = get_object_or_404(User, username=request.user.username)

        #edit: inserito il controllo; se l'utente non c'è ne creo uno anonimo.
        self.user = User.objects.filter(username=request.user.username).first()
        if not self.user:
            self.user = AnonymousUser()

        # Try to locate a handler method.
        try:
            callback = getattr(self, "do_%s" % request.method)
        except AttributeError:
            # This class doesn't implement this HTTP method, so return
            # a 405 ("Method Not Allowed") response and list the
            # allowed methods.
            allowed_methods = [m.lstrip("do_") for m in dir(self) if m.startswith("do_")]
            return HttpResponseNotAllowed(allowed_methods)

        # Call the looked-up method
        return callback()
