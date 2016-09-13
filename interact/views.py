from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Flavor, Course, Question, Assessment, Score
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from .serializers import UserSerializer, GroupSerializer, FlavorSerializer, CourseSerializer, QuestionSerializer, AssessmentSerializer, ScoreSerializer


class IndexView(TemplateView):
    template_name = 'index.html'


class CreateTest(TemplateView):
    template_name = 'teachers/create_test.html'


class AddClass(TemplateView):
    template_name = 'teachers/add_class.html'


def student(request):
    scores = Score.objects.all()
    context = {'scores': scores}
    return render(request, 'students/student_dash.html', context)


def question(request, question_id):
    context = {'questions': []}
    all_questions = Question.objects.all()
    for question in all_questions:
        if question.flavor.name == 'fill-in-the-blank':
            context['questions'].append(question)
            return render(request, 'students/text_question.html', context)
        if question.flavor.name == 'multiple choice':
            context['questions'].append(question)
            return render(request, 'students/multi_choice_question.html', context)
        if question.flavor.name == 'multi-select':
            context['questions'].append(question)
            return render(request, 'students/multi_select_question.html', context)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


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
