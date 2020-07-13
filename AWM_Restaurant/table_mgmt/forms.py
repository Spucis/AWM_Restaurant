from django import forms
from .models import Table, Plate, Menu

# definisco il form direttamente dal modello del tavolo
class TableForm(forms.ModelForm):
    number = forms.IntegerField(min_value=0)
    class Meta:
        model = Table
        fields = '__all__'

class PlateForm(forms.ModelForm):
    class Meta:
        model = Plate
        fields = '__all__'