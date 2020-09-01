from django.test import TestCase
from django.test.client import Client
from django.conf import settings
from .models import *
import datetime
from django.utils import timezone


# Create your tests here.

class OrderHttpTests(TestCase):

    def setUp(self):
        self.dest_orders_url = 'http://{}:8000/restaurant/orders'.format(settings.ALLOWED_HOSTS[0])

        self.table = Table(number=1)
        self.table.save()
        self.client = User(
            username="cliente1",
            password="1234prova"
        )
        self.client.save()

        self.waiter = User(
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

        HttpClient = Client()
        response = HttpClient.post(self.dest_orders_url, data={"orderCode": "1234"}, content_type="application/json")
        self.assertContains(response, 'id')

    def test_check_order_with_given_password_not_exists(self):
        """

        Check Order requests and responses with a NON existing order password
        """

        HttpClient = Client()
        response = HttpClient.post(self.dest_orders_url, data={"orderCode": "3456"}, content_type="application/json")
        self.assertEqual(response.json()['id'], -1)

    def test_check_order_with_given_password_exists(self):
        """

        Check Order requests and responses with an existing order password
        """

        HttpClient = Client()
        response = HttpClient.post(self.dest_orders_url, data={"orderCode": "1234"}, content_type="application/json")
        self.assertEqual(response.json()['id'], self.order_id)



