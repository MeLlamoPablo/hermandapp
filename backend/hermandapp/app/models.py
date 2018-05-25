from django.db import models

class Brotherhood(models.Model):
    name = models.CharField(max_length=50)
    manager_email = models.EmailField()
    created = models.DateTimeField(auto_now_add=True)