from django.conf.urls import include, url

from . import views

urlpatterns = [  # new UI with react and restful APIs
    url(r'^$', views.display_index),
]
