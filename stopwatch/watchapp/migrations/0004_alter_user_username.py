# Generated by Django 5.1.2 on 2024-10-18 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('watchapp', '0003_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]