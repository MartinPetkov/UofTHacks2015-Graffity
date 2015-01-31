from django.conf.urls import patterns, url

from graffity import views

urlpatterns = patterns('',
    url(r'^get_drawings/', views.get_drawings, name='get_drawings'),
    url(r'^upload_drawing/', views.upload_drawing, name='upload_drawing'),
)
