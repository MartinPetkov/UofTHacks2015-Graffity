from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers

from graffity.models import Graffiti

# Create your views here.

# Get all drawings for a given URL
def get_drawings(request):
    # Get the URL from the headers
    req_graffiti_url = request.META.get('req_graffiti_url');

    req_drawings = Graffiti.objects.filter(graffiti_url=req_graffiti_url).values('graffiti_name', 'drawing_image')

    response = serializers.serialize('json', req_drawings)

    return HttpResponse(response)

def upload_drawing(request):
    # Get the URL, name of the drawing, and the actual drawing data from the headers
    req_graffiti_name = request.META.get('req_graffiti_name');
    req_graffiti_url = request.META.get('req_graffiti_url');
    req_drawing_image = request.META.get('req_drawing_image');


    data = {'drawing_image': req_drawing_image}

    g, created = Graffiti.objects.update_or_create(graffiti_name=req_graffiti_name, graffiti_url=req_graffiti_url, defaults=data)

    response = ''
    if created:
        response = "Drawing created"
    else:
        response = "Drawing updated"

    return HttpResponse(response)
