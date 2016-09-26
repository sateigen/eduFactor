from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Flavor, Course, Question, Assessment, Score
from django.contrib.auth import authenticate, login, logout
from django.views.generic.edit import CreateView
from django.http import HttpResponseRedirect
from rest_framework import viewsets
from django.views import View, generic
from django.contrib.auth.models import User, Group
from .serializers import UserSerializer, GroupSerializer, FlavorSerializer
from .serializers import CourseSerializer, QuestionSerializer
from .serializers import AssessmentSerializer, ScoreSerializer
from .forms import UserForm
import random
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@login_required
def home(request):
    return HttpResponseRedirect(reverse(student, args=[request.user.id]))


class SignUpView(CreateView):
    form_class = UserForm
    template_name = 'registration/register.html'
    success_url = '/'

    def form_valid(self, form):
        valid = super(SignUpView, self).form_valid(form)
        username, password = form.cleaned_data.get('username'), form.cleaned_data.get('password')
        new_user = authenticate(username=username, password=password)
        login(self.request, new_user)
        return valid


class IndexView(TemplateView):
    template_name = 'index.html'


class AboutView(TemplateView):
    template_name = 'interact/about.html'


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
    flavor_urls = {'bar graph': 'bar', 'fraction-fill-in': 'fraction',
                   'drag-and-drop': 'drag', 'multiple choice': 'choice',
                   'fill-in-the-blank': 'fill', 'multi-select': 'select'}
    correct = {}
    attempted = {}
    differences = {}
    total = 0
    for flavor in flavor_names:
        correct[flavor] = 0
        attempted[flavor] = 0
        for score in scores:
            if score.question.flavor.name == flavor and score.score:
                correct[flavor] += 1
            if score.question.flavor.name == flavor:
                attempted[flavor] += 1
                total += 1
        if attempted[flavor] == 0:
            differences[flavor] = 2
        else:
            differences[flavor] = correct[flavor]/attempted[flavor]
    focus = min(differences, key=lambda key: differences[key])
    focus_url = flavor_urls[focus]
    print(focus)

    context = {'student': student, 'scores': scores, 'correct': correct, 'attempted': attempted, 'focus': focus_url, 'total': total}
    context['flavor_names'] = flavor_names
    return render(request, 'students/student_dash.html', context)


def tutorial_question(request, question_id):
    question = Question.objects.get(pk=question_id)
    answers = question.possible_solutions.split('|')
    random.shuffle(answers)
    context = {'question': question, 'answers': answers}
    if question.flavor.name == 'fill-in-the-blank':
        template = 'students/text_question.html'
    elif question.flavor.name == 'multiple choice':
        template = 'students/multi_choice_question.html'
    elif question.flavor.name == 'multi-select':
        correct = question.solution.split('|')
        context['correct'] = correct
        template = 'students/multi_select_question.html'
    elif question.flavor.name == 'drag-and-drop':
        answers = answers.sort()
        solutions = question.solution.split('|')
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
    elif question.flavor.name == 'bar graph':
        solutions = question.solution.split('|')
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


def get_queryset_by_level(request, difficulty_level):
    questions = Question.objects.filter(difficulty_level=difficulty_level)
    q_list = []
    while len(q_list) < 11:
        selection = random.choice(questions)
        if selection not in q_list:
            q_list.append(selection)
    paginator = Paginator(q_list, 1)
    print(paginator.num_pages)
    page = request.GET.get('page')
    try:
        pager = paginator.page(page)
        question = pager[0]
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        pager = paginator.page(1)
        question = pager[0]
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        # pager = paginator.page(paginator.num_pages)
        return HttpResponseRedirect('/')
    print(page)
    answers = question.possible_solutions.split('|')
    random.shuffle(answers)
    context = {'question': question, 'answers': answers, 'pager': pager}
    if question.flavor.name == 'fill-in-the-blank':
        template = 'practice/fill_in_the_blank_practice.html'
    elif question.flavor.name == 'multiple choice':
        template = 'practice/multi_choice_practice.html'
    elif question.flavor.name == 'multi-select':
        correct = question.solution.split('|')
        context['correct'] = correct
        template = 'practice/multi_select_practice.html'
    elif question.flavor.name == 'drag-and-drop':
        answers = answers.sort()
        solutions = question.solution.split('|')
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
    elif question.flavor.name == 'bar graph':
        solutions = question.solution.split('|')
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


def graph(request):
    questions = Question.objects.filter(flavor=6)
    questions = list(questions)
    random.shuffle(questions)
    questions = questions[:10]
    paginator = Paginator(questions, 1)
    page = request.GET.get('page')
    context = {}
    try:
        pager = paginator.page(page)
        question = pager[0]
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        pager = paginator.page(1)
        question = pager[0]
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        # pager = paginator.page(paginator.num_pages)
        return HttpResponseRedirect('/')
    answers = question.possible_solutions.split('|')
    random.shuffle(answers)
    context['pager'] = pager
    context['question'] = question
    context['answers'] = answers
    solutions = question.solution.split('|')
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
    return render(request, 'practice/graph_practice.html', context)


def fill_blank(request):
    questions = Question.objects.filter(flavor=2)
    questions = list(questions)
    random.shuffle(questions)
    questions = questions[:10]
    paginator = Paginator(questions, 1)
    page = request.GET.get('page')
    context = {}
    try:
        pager = paginator.page(page)
        question = pager[0]
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        pager = paginator.page(1)
        question = pager[0]
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        # pager = paginator.page(paginator.num_pages)
        return HttpResponseRedirect('/')
    answers = question.possible_solutions.split('|')
    random.shuffle(answers)
    context['pager'] = pager
    context['question'] = question
    context['answers'] = answers
    return render(request, 'practice/fill_in_the_blank_practice.html', context)


def multiple_choice(request):
    questions = Question.objects.filter(flavor=1)
    questions = list(questions)
    random.shuffle(questions)
    questions = questions[:10]
    paginator = Paginator(questions, 1)
    page = request.GET.get('page')
    context = {}
    try:
        pager = paginator.page(page)
        question = pager[0]
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        pager = paginator.page(1)
        question = pager[0]
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        # pager = paginator.page(paginator.num_pages)
        return HttpResponseRedirect('/')
    answers = question.possible_solutions.split('|')
    random.shuffle(answers)
    context['pager'] = pager
    context['question'] = question
    context['answers'] = answers
    return render(request, 'practice/multi_choice_practice.html', context)


def fraction_fill_in(request):
    questions = Question.objects.filter(flavor=5)
    questions = list(questions)
    random.shuffle(questions)
    questions = questions[:10]
    paginator = Paginator(questions, 1)
    page = request.GET.get('page')
    print(paginator.num_pages)
    context = {}
    try:
        pager = paginator.page(page)
        question = pager[0]
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        pager = paginator.page(1)
        question = pager[0]
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        # pager = paginator.page(paginator.num_pages)
        return HttpResponseRedirect('/')
    answers = question.possible_solutions.split('|')
    table_cells = int(question.description) * 'x'
    context['table_cells'] = table_cells
    context['pager'] = pager
    context['question'] = question
    context['answers'] = answers
    return render(request, 'practice/fraction_practice.html', context)


def multiple_select(request):
    questions = Question.objects.filter(flavor=3)
    questions = list(questions)
    random.shuffle(questions)
    questions = questions[:10]
    paginator = Paginator(questions, 1)
    page = request.GET.get('page')
    context = {}
    try:
        pager = paginator.page(page)
        question = pager[0]
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        pager = paginator.page(1)
        question = pager[0]
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        # pager = paginator.page(paginator.num_pages)
        return HttpResponseRedirect('/')
    answers = question.possible_solutions.split('|')
    random.shuffle(answers)
    context['pager'] = pager
    context['question'] = question
    context['answers'] = answers
    return render(request, 'practice/multi_select_practice.html', context)


def drag_and_drop(request):
    questions = Question.objects.filter(flavor=4)
    questions = list(questions)
    random.shuffle(questions)
    questions = questions[:10]
    paginator = Paginator(questions, 1)
    page = request.GET.get('page')
    context = {}
    try:
        pager = paginator.page(page)
        question = pager[0]
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        pager = paginator.page(1)
        question = pager[0]
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        # pager = paginator.page(paginator.num_pages)
        return HttpResponseRedirect('/')
    answers = question.possible_solutions.split('|')
    random.shuffle(answers)
    solutions = question.solution.split('|')
    correct = {}
    for answer in solutions:
        temp = answer.split(':')
        correct[temp[0]] = temp[1]
    context['solutions'] = correct
    context['pager'] = pager
    context['question'] = question
    context['answers'] = answers
    return render(request, 'practice/drag_drop_practice.html', context)


def get_queryset_by_flavor(request, flavor):
    questions = Question.objects.filter(flavor__name__icontains=flavor)
    q_list = []
    while len(q_list) < 11:
        selection = random.choice(set(questions))
        if selection not in q_list:
            q_list.append(selection)
    for question in q_list:
        answers = question.possible_solutions.split('|')
        random.shuffle(answers)
        context = {'question': question, 'answers': answers, 'questions': questions}
        if question.flavor.name == 'fill-in-the-blank':
            template = 'practice/fill_in_the_blank_practice.html'
        elif question.flavor.name == 'multiple choice':
            template = 'practice/multi_choice_practice.html'
        elif question.flavor.name == 'multi-select':
            correct = question.solution.split('|')
            context['correct'] = correct
            template = 'practice/multi_select_practice.html'
        elif question.flavor.name == 'drag-and-drop':
            answers = answers.sort()
            solutions = question.solution.split('|')
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
        elif question.flavor.name == 'bar graph':
            solutions = question.solution.split('|')
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
