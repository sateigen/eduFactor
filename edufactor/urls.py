from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from interact import views

router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet)
router.register(r'group', views.GroupViewSet)
router.register(r'flavor', views.FlavorViewSet)
router.register(r'course', views.CourseViewSet)
router.register(r'question', views.QuestionViewSet)
router.register(r'assessment', views.AssessmentViewSet)
router.register(r'score', views.ScoreViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('interact.urls')),
    url(r'^api/', include(router.urls))
]
