# Generated by Django 2.0.5 on 2018-05-23 17:04

from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Brotherhood',
            fields=[
                ('id', models.AutoField(
                    auto_created=True,
                    primary_key=True,
                    serialize=False,
                    verbose_name='ID'
                )),
                ('name', models.CharField(max_length=50)),
                ('manager_email', models.EmailField(max_length=254)),
                ('order', models.PositiveIntegerField(
                    editable=False,
                    db_index=True
                )),
                ('created_at', models.DateTimeField()),
            ],
        ),
    ]
