# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.sessions.models import Session
from . import models

class UserModelAdmin(admin.ModelAdmin):
    list_display = ['id', "nickname", "email_address", "phone", "balance"]
    filter_horizontal = ['friends', 'debts', 'exchanges']

class GroupModelAdmin(admin.ModelAdmin):
    list_display = ['id', "name", 'date_created', "creator"]
    filter_horizontal = ['members', 'debts', 'exchanges']


class DebtModelAdmin(admin.ModelAdmin):
    list_display = ['id', "lender", "borrower", "amount", "date_created", "clear"]


class ExchangeModelAdmin(admin.ModelAdmin):
    list_display = ['id', "payer", 'payee', "amount", "date_created"]


admin.site.register(models.User, UserModelAdmin)
admin.site.register(models.Group, GroupModelAdmin)
admin.site.register(models.Debt, DebtModelAdmin)
admin.site.register(models.Exchange, ExchangeModelAdmin)
