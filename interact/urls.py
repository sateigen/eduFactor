from django.conf.urls import url
from . import views
from .views import IndexView, CreateTest, AddClass, PracticeLandingView, AboutView
from django.views.generic.edit import CreateView
from .forms import UserForm
from django.contrib.auth.views import login, logout

urlpatterns = [
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^about/$', AboutView.as_view(), name='about'),
    url(r'^login/$', login, name='login'),
    url(r'^register/$', CreateView.as_view(
        template_name='registration/register.html',
        form_class=UserForm,
        success_url='/'),
        name='register'),
    url(r'^logout/$', logout, {'next_page': '/'}, name='logout'),
    url(r'^create_test/$', CreateTest.as_view(), name='create_test'),
    url(r'^add_class/$', AddClass.as_view(), name='add_class'),
    url(r'^student/(?P<id>\d+)/$', views.student, name='student'),
    url(r'^tutorial/([0-9]+)/$', views.tutorial_question, name='question_detail'),
    # url(r'^practice/([0-9]+)/$', views.practice_question, name='practice_detail'),
    url(r'^practice_dashboard/$', PracticeLandingView.as_view(), name='practice'),
    url(r'^practice/(?P<difficulty_level>[0-9]+)/$', views.get_queryset_by_level, name='level'),
    # url(r'^practice/(?P<pk>[0-9]+)/drag-and-drop/$', DragAndDrop.as_view(), name='drag_and_drop'),
    url(r'^home/$', views.home, name='home')
    ]

# ?P<flavor>\D+)/$
