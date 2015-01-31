# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Graffiti',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('graffiti_name', models.TextField()),
                ('graffiti_url', models.TextField()),
                ('drawing_image', models.BinaryField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
