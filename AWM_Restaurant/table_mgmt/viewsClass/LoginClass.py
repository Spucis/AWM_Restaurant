from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from .ManagerClass import *

class LoginManager(Manager):

    def __call__(self, request, order_id=None, table=None, target_hash=None):
        self.request = request
        return self.call_check(self.request)

    # GET
    @permission_required('table_mgmt.change_order', raise_exception=True)
    def do_GET(self):
        pass

    # POST that create a new User
    def do_POST(self):
        # Retrieve jsonified data
        req_body = self.request.POST

        form = AuthenticationForm(data=req_body)

        if form.is_valid():
            username = req_body['username']
            raw_password = req_body['password']
            print("username: {}, psw: {}".format(username, raw_password))
            user = authenticate(username=username, password=raw_password)
            print("USE: {}".format(user))
            login(self.request, user)
            return HttpResponseRedirect('/restaurant/')
        else:
            print("NOT")
            print(form)
            return HttpResponseRedirect('/restaurant/')


