from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Flavor, Course, Question, Assessment, Score
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from .serializers import UserSerializer, GroupSerializer, FlavorSerializer, CourseSerializer, QuestionSerializer, AssessmentSerializer, ScoreSerializer
import random


class IndexView(TemplateView):
    template_name = 'index.html'


class CreateTest(TemplateView):
    template_name = 'teachers/create_test.html'


class AddClass(TemplateView):
    template_name = 'teachers/add_class.html'


def student(request, student_id):
    scores = Score.objects.all()
    i = 0
    for score in scores:
        if score.score is True:
            i += 1
    correct = (i // 5) * 'x'
    context = {'scores': scores, 'correct': correct}
    return render(request, 'students/student_dash.html', context)


def question(request, question_id):
    question = Question.objects.get(pk=question_id)
    answers = question.possible_solutions.split(',')
    random.shuffle(answers)
    context = {'question': question, 'answers': answers}
    if question.flavor.name == 'fill-in-the-blank':
        template = 'students/text_question.html'
    elif question.flavor.name == 'multiple choice':
        template = 'students/multi_choice_question.html'
    elif question.flavor.name == 'multi-select':
        correct = question.solution.split(',')
        context.update({'correct': correct})
        template = 'students/multi_select_question.html'
    elif question.flavor.name == 'drag-and-drop':
        template = 'students/drag_drop_question.html'
    elif question.flavor.name == 'fraction-fill-in':
        template = 'students/fraction_question.html'
    return render(request, template, context)


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
