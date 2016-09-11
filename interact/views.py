from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Answer, Flavor, Concept, Course, Question, Assessment, Score


class IndexView(TemplateView):
    template_name = 'index.html'
