from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Flavor, Course, Question, Assessment, Score
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from .serializers import UserSerializer, GroupSerializer, FlavorSerializer
from .serializers import CourseSerializer, QuestionSerializer
from .serializers import AssessmentSerializer, ScoreSerializer
import random
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied


@login_required
def home(request):
    return HttpResponseRedirect(reverse(student, args=[request.user.id]))


class IndexView(TemplateView):
    template_name = 'index.html'


class PracticeLandingView(TemplateView):
    template_name = 'practice/practice_landing.html'


class CreateTest(TemplateView):
    template_name = 'teachers/create_test.html'


class AddClass(TemplateView):
    template_name = 'teachers/add_class.html'


def student(request, id):
    student = User.objects.get(id=id)
    if student != request.user:
        raise PermissionDenied
    scores = student.score_set.all()
    flavors = Flavor.objects.all()
    flavor_names = [flavor.name for flavor in flavors]
    correct = {}
    for flavor in flavor_names:
        correct[flavor] = 0
        for score in scores:
            if score.question.flavor.name == flavor and score.score:
                correct[flavor] += 1
    context = {'student': student, 'scores': scores, 'correct': correct}
    context['flavor_names'] = flavor_names
    return render(request, 'students/student_dash.html', context)


def tutorial_question(request, question_id):
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
        context['correct'] = correct
        template = 'students/multi_select_question.html'
    elif question.flavor.name == 'drag-and-drop':
        answers = answers.sort()
        solutions = question.solution.split(',')
        correct = {}
        for answer in solutions:
            temp = answer.split(':')
            correct[temp[0]] = temp[1]
        context['solutions'] = correct
        template = 'students/drag_drop_question.html'
    elif question.flavor.name == 'fraction-fill-in':
        table_cells = int(question.description) * 'x'
        context['table_cells'] = table_cells
        template = 'students/fraction_question.html'
    elif question.flavor.name == 'graph':
        solutions = question.solution.split(',')
        correct = {}
        for answer in solutions:
            temp = answer.split(':')
            correct[temp[0]] = temp[1]
        context['correct'] = correct
        context['graph_width'] = len(answers)
        graph_height = max([int(item) for item in correct.values()])
        context['graph_height'] = graph_height
        context['graph_title'] = question.description
        context['x_labels'] = list(correct.keys())
        y_labels = list(range(1, graph_height + 1))
        y_labels.reverse()
        context['y_labels'] = y_labels
        template = 'students/graph_question.html'
    return render(request, template, context)


def practice_question(request, question_id):
    question = Question.objects.get(pk=question_id)
    answers = question.possible_solutions.split(',')
    random.shuffle(answers)
    context = {'question': question, 'answers': answers}
    if question.flavor.name == 'fill-in-the-blank':
        template = 'practice/fill_in_the_blank_practice.html'
    elif question.flavor.name == 'multiple choice':
        template = 'practice/multi_choice_practice.html'
    elif question.flavor.name == 'multi-select':
        correct = question.solution.split(',')
        context['correct'] = correct
        template = 'practice/multi_select_practice.html'
    elif question.flavor.name == 'drag-and-drop':
        answers = answers.sort()
        solutions = question.solution.split(',')
        correct = {}
        for answer in solutions:
            temp = answer.split(':')
            correct[temp[0]] = temp[1]
        context['solutions'] = correct
        template = 'practice/drag_drop_practice.html'
    elif question.flavor.name == 'fraction-fill-in':
        table_cells = int(question.description) * 'x'
        context['table_cells'] = table_cells
        template = 'practice/fraction_practice.html'
    elif question.flavor.name == 'graph':
        solutions = question.solution.split(',')
        correct = {}
        for answer in solutions:
            temp = answer.split(':')
            correct[temp[0]] = temp[1]
        context['correct'] = correct
        context['graph_width'] = len(answers)
        graph_height = max([int(item) for item in correct.values()])
        context['graph_height'] = graph_height
        context['graph_title'] = question.description
        context['x_labels'] = list(correct.keys())
        y_labels = list(range(1, graph_height + 1))
        y_labels.reverse()
        context['y_labels'] = y_labels
        template = 'practice/graph_practice.html'
    return render(request, template, context)


def about(request):
    return render(request, 'interact/about.html', context={})


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
