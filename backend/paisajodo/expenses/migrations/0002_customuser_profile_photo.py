# Generated by Django 5.1.7 on 2025-03-21 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile_photo',
            field=models.ImageField(default='default.jpg', upload_to='user_profiles/'),
        ),
    ]
