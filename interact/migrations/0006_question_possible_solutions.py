# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-13 20:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interact', '0005_auto_20160912_1357'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='possible_solutions',
            field=models.TextField(null=True),
        ),
    ]