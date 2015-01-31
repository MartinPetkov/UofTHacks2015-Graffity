from django.db import models

# Create your models here.
class Graffiti(models.Model):
    graffiti_name = models.TextField()
    graffiti_url = models.TextField()
    drawing_image = models.BinaryField()

    def __str__(self):
        return self.graffiti_name + " at: " + self.graffiti_url
