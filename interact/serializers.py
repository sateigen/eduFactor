from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Flavor, Question, Score, Course, Assessment


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class FlavorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Flavor
        fields = ('id', 'name', 'description')


class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'title', 'description', 'answer', 'flavor', 'concept', 'difficulty_level')


class ScoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Score
        fields = ('id', 'question', 'user', 'score', 'time_stamp')


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'user', 'name')


class AssessmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Assessment
        fields = ('id', 'question', 'created_by', 'title', 'is_active', 'course')
