from django.test import TestCase
from django.test.client import Client
from django.contrib.auth.models import User, Group, Permission
from django.conf import settings
from .models import *
import datetime
from django.utils import timezone

class OrderHttpTests(TestCase):

    def setUp(self):
        self.dest_orders_url = 'http://{}:8000/restaurant/orders'.format(settings.ALLOWED_HOSTS[0])

        self.table = Table(number=1)
        self.table.save()

        self.clients_group = Group.objects.create(name="clients")

        #print([perm.codename for perm in Permission.objects.all()])
        self.clients_permissions = [Permission.objects.get(codename=p_name) for p_name in [
            "view_menu",
            "add_order",
            "change_order",
            "delete_order",
            "view_order",
            "view_plate",
            "view_platedetails",
            "view_table"
        ]]
        #print(self.clients_permissions)
        self.clients_group.permissions.set(self.clients_permissions)

        self.client_username = "cliente1"
        self.client_password = "1234prova"
        self.client = User.objects.create_user(
            username=self.client_username,
            password=self.client_password
        )
        self.client.groups.add(Group.objects.get(name="clients"))
        self.client.save()

        self.waiter = User.objects.create_user(
            username="cameriere1",
            password="1234prova"
        )
        self.waiter.save()
        self.date = timezone.now()
        self.seats = 2
        self.password = "1234"

        self.menu_code = 1
        self.menu_description = "Menu 1"
        self.menu = Menu(
            code=self.menu_code,
            description=self.menu_description
        )
        self.menu.save()

        self.plate_code = 1
        self.plate_name = "Spaghetti"
        self.plate_description = "Sono dei semplici spaghetti"
        self.plate_price = 10.0
        self.plate = Plate(
            code=self.plate_code,
            name=self.plate_name,
            description=self.plate_description,
            price=self.plate_price,
            menu=self.menu
        )
        self.plate.save()

        self.order_id = 1
        self.order = Order(
            id=self.order_id,
            table=self.table,
            client=self.client,
            waiter=self.waiter,
            date=self.date,
            seats=self.seats,
            password=self.password,
        )
        self.order.plates.add(self.plate)
        self.order.save()

    def test_check_order_response_contains_id_field(self):
        """

        Check Order response with id field
        """

        httpClient = Client()
        response = httpClient.post(self.dest_orders_url, data={"orderCode": "1234"}, content_type="application/json")
        self.assertContains(response, 'id')

    def test_check_order_with_given_password_not_exists(self):
        """

        Check Order requests and responses with a NON existing order password
        """

        httpClient = Client()
        response = httpClient.post(self.dest_orders_url, data={"orderCode": "3456"}, content_type="application/json")
        self.assertEqual(response.json()['id'], -1)

    def test_check_order_with_given_password_exists(self):
        """

        Check Order requests and responses with an existing order password
        """

        httpClient = Client()
        response = httpClient.post(self.dest_orders_url, data={"orderCode": "1234"}, content_type="application/json")
        self.assertEqual(response.json()['id'], self.order_id)

    def test_check_client_with_no_permissions_get_403_when_trying_get_orders(self):
        """
        Check that with no permissions its impossible to retrieve the order list
        :return:
        """

        httpClient = Client()
        response = httpClient.get(self.dest_orders_url)
        self.assertEqual(response.status_code, 403)

    def test_check_client_with_permissions_receive_his_orders_when_trying_get_orders(self):
        """
        Check that with correct permissions correctly retrieve his order list
        :return:
        """

        httpClient = Client()
        if httpClient.login(
            username=self.client_username,
            password=self.client_password
        ):
            response = httpClient.get(self.dest_orders_url)
            self.assertEqual(response.status_code, 200)
        else:
            assert False


