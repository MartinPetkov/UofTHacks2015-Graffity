from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'graffity_site.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^graffity/', include('graffity.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
