from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Answer, Flavor, Course, Question, Assessment, Score
from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from .serializers import UserSerializer, GroupSerializer, AnswerSerializer, FlavorSerializer, CourseSerializer, QuestionSerializer, AssessmentSerializer, ScoreSerializer


class IndexView(TemplateView):
    template_name = 'index.html'


class CreateTest(TemplateView):
    template_name = 'teachers/create_test.html'


class AddClass(TemplateView):
    template_name = 'teachers/add_class.html'


def student(request):
    return render(request, 'students/student_dash.html', context={})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class FlavorViewSet(viewsets.ModelViewSet):
    queryset = Flavor.objects.all()
    serializer_class = FlavorSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer


class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
