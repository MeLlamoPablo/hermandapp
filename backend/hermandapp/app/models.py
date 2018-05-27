from django.db import models
from ordered_model.models import OrderedModel

class Brotherhood(OrderedModel):
    name = models.CharField(max_length=50)
    manager_email = models.EmailField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta(OrderedModel.Meta):
        pass