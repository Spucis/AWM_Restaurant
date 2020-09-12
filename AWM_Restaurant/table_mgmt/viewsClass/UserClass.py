from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

from .ManagerClass import *

class UserManager(Manager):

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
        req_body = json.loads(self.request.body)

        group_name = req_body['group']
        del req_body['group']

        # Parse data in a structure acceptable from UserCreationForm
        q_body = QueryDict('', mutable=True)
        q_body.update(req_body)

        form = UserCreationForm(q_body)

        if form.is_valid():
            user = form.save()
            group = Group.objects.get(name=group_name)
            user.groups.add(group)
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(self.request, user)
            return JsonResponse({'resp' : 'UserCreated'})
        else:
            return JsonResponse(json.loads(form.errors.as_json(escape_html=True)), status=422)


