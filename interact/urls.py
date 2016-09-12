from django.conf.urls import url
from . import views
from .views import IndexView, CreateTest, AddClass
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import login, logout

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^login/$', login, name='login'),
    url(r'^register/$', CreateView.as_view(
        template_name='registration/register.html',
        form_class=UserCreationForm,
        success_url='/'),
        name='register'),
    url(r'^logout/$', logout, {'next_page': '/'}, name='logout'),
    url(r'^create_test/$', views.CreateTest.as_view(), name='create_test'),
    url(r'^addclass/$', views.AddClass.as_view(), name='add_class'),
    url(r'^student/$', views.student, name='student')
]
