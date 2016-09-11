from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Answer, Flavor, Concept, Course, Question, Assessment, Score


class IndexView(TemplateView):
    template_name = 'index.html'


class CreateTest(TemplateView):
    template_name = 'create_test.html'


class AddClass(TemplateView):
    template_name = 'add_class.html'
