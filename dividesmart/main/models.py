# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os
import shutil

from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, nickname, email_address, password, **extra_fields):
        """
        Creates and saves a User with the given nickname, email and password.
        """
        if not nickname:
            raise ValueError('The given nickname must be set')
        email_address = self.normalize_email(email_address)
        user = self.model(nickname=nickname, email_address=email_address, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, nickname, email_address=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(nickname, email_address, password, **extra_fields)

    def create_superuser(self, nickname, email_address, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(nickname, email_address, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    nickname = models.CharField(max_length=254)

    email_address = models.EmailField(max_length=254, blank=False, null=False, unique=True)
    phone = models.CharField(max_length=20)
    balance = models.FloatField(default=0)

    # field "password" inherited from AbstractBaseUser

    friends = models.ManyToManyField("User", related_name="friends_set", blank=True, symmetrical=False)
    debts = models.ManyToManyField("Debt", related_name="debts_set", blank=True, symmetrical=False)
    exchanges = models.ManyToManyField("Exchange", related_name="exchanges_set", blank=True, symmetrical=False)

    USERNAME_FIELD = "email_address"

    REQUIRED_FIELDS = ["nickname"]

    is_active = models.BooleanField(
        default=True,
    )

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )

    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()

    def get_full_name(self):
        return self.nickname + " <" + self.email_address + ">"

    def get_short_name(self):
        return self.nickname

    def set_nickname(self, nickname):
        self.nickname = nickname

    def set_email_address(self, email_address):
        self.email_address = email_address

    # set_password method inherited from super class

    def __unicode__(self):
        return self.get_short_name()

# class User(models.Model):
#     name = models.CharField(max_length=254)
#     email_address = models.EmailField(max_length=254, blank=False, null=False, unique=True)
#     phone = models.CharField(max_length=20)
#     balance = models.FloatField()
#     friends = models.ManyToManyField("User", related_name="friends_set", blank=True, symmetrical=False)
#     debts = models.ManyToManyField("Debt", related_name="debts_set", blank=True, symmetrical=False)
#     exchanges = models.ManyToManyField("Exchange", related_name="exchanges_set", blank=True, symmetrical=False)


class Group(models.Model):
    name = models.CharField(max_length=254)
    date_created = models.DateTimeField(default=timezone.now)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    members = models.ManyToManyField("User", related_name="group_members", blank=True, symmetrical=False)
    debts = models.ManyToManyField("Debt", related_name="group_debts", blank=True, symmetrical=False)
    exchanges = models.ManyToManyField("Exchange", related_name="group_exchanges", blank=True, symmetrical=False)


class Debt(models.Model):
    lender = models.ForeignKey(User, related_name="debt_lender", on_delete=models.CASCADE)
    borrower = models.ForeignKey(User, related_name="debt_borrower", on_delete=models.CASCADE)
    amount = models.FloatField()
    date_created = models.DateTimeField(default=timezone.now)
    clear = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)


class Exchange(models.Model):
    payer = models.ForeignKey(User, related_name="debt_payer", on_delete=models.CASCADE)
    payee = models.ForeignKey(User, related_name="debt_payee", on_delete=models.CASCADE)
    amount = models.FloatField()
    date_created = models.DateTimeField(default=timezone.now)
