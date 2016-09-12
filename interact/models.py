from django.db import models
from django.contrib.auth.models import User


# Ex: hotspots, fraction fill in, drag and drop, multiple select, building charts, etc.
class Flavor(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()


# Ex: Geometry, Computation, Estimation, Algebra, Patterns, etc.
class Question(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(null=True)
    flavor = models.ForeignKey(Flavor)
    concept = models.CharField(max_length=200)
    difficulty_level = models.IntegerField()
    solution = models.CharField(max_length=200, null=True)
    feedback = models.TextField(null=True)


class Score(models.Model):
    question = models.ForeignKey(Question)
    user = models.ForeignKey(User)
    score = models.BooleanField(default=None)
    time_stamp = models.DateTimeField(auto_now_add=True)


class Course(models.Model):
    user = models.ManyToManyField(User)
    name = models.CharField(max_length=200)


class Assessment(models.Model):
    question = models.ManyToManyField(Question)
    created_by = models.ForeignKey(User)
    title = models.CharField(max_length=200)
    is_active = models.BooleanField(default=False)
    course = models.ForeignKey(Course, null=True)
