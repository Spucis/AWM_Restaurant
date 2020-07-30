from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.decorators import permission_required
from ..models import *
from ..forms import *

class Manager:

    def call_check(self, request):

        # Look up the user and throw a 404 if it doesn't exist
        self.user = get_object_or_404(User, username=request.user.username)

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
