from django.db import models
from ordered_model.models import OrderedModel

class Brotherhood(OrderedModel):
    name = models.CharField(max_length=50)
    manager_email = models.EmailField()
    created_at = models.DateTimeField()

    class Meta(OrderedModel.Meta):
        pass