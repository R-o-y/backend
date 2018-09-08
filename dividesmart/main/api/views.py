import base64
import json
import urllib2
import uuid

import requests
from django.contrib.auth import authenticate, get_user, login, logout
from django.contrib.auth.models import AnonymousUser
from django.core.exceptions import ObjectDoesNotExist
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.views.generic import View

from main.models import User


def get_friends_list(request):
    user = get_user(request)
    friends = list(user.friends)
    data = {
        'friends': friends
    }
    return JsonResponse(data)

def get_debts_list(request):
    user = get_user(request)
    debts = list(user.debts)
    result_list = []
    for debt in debts:
        if not debt.clear:
            result_list.append(debt)
    data = {
        'debts': result_list
    }
    return JsonResponse(data)

def get_groups_list(request):
    user = get_user(request)
    groups = list(user.groups)
    data = {
        'groups': groups
    }
    return JsonResponse(data)

def get_all_lends(request):
    user = get_user(request)
    debts = user.debts
    result_list = []
    for debt in debts:
        if (not debt.clear) and debt.lender == user:
            result_list.append(debt)
    data = {
        'lends': list(result_list)
    }
    return JsonResponse(data)


def get_all_borrows(request):
    user = get_user(request)
    debts = user.debts
    result_list = []
    for debt in debts:
        if (not debt.clear) and debt.borrower == user:
            result_list.append(debt)
    data = {
        'borrows': list(result_list)
    }
    return JsonResponse(data)

def get_friend_lends(request):
    user = get_user(request)
    friend_pk = request.GET['pk']
    friend = User.objects.filter(id = friend_pk)
    debts = user.debts
    result_list = []
    for debt in debts:
        if (not debt.clear) and debt.lender == user and debt.borrower == friend:
            result_list.append(debt)
    data = {
        'friend_lends': list(result_list)
    }
    return JsonResponse(data)

def get_friend_borrows(request):
    user = get_user(request)
    friend_pk = request.GET['pk']
    friend = User.objects.filter(id = friend_pk)
    debts = user.debts
    result_list = []
    for debt in debts:
        if (not debt.clear) and debt.borrower == user and debt.lender == friend:
            result_list.append(debt)
    data = {
        'friend_borrows': list(result_list)
    }
    return JsonResponse(data)

def get_group_debts(request):
    group_pk = request.GET['pk']
    group = Group.objects.filter(id = group_pk)
    debts = group.debts
    data = {
        'debts': debts
    }
    return JsonResponse(data)

def create_group(request):
    name = request.GET['name']
    creator = get_user(request)
    group = Group()
    group.name = name
    group.creator = creator

def add_group_member(request):
    member_pk = request.GET['member_pk']
    member = User.objects.filter(id = member_pk)
    group_pk = request.GET['group_pk']
    group = Group.objects.filter(id = group_pk)
    group.members.append(member)

def create_debt(request):
    lender_pk = request.GET['lender_pk']
    lender = User.objects.filter(id = lender_pk)
    borrower_pk = request.GET['borrower_pk']
    borrower = User.objects.filter(id = borrower_pk)
    amount = request.GET['amount']
    debt = Debt()
    debt.amount = amount
    debt.lender = lender
    debt.borrower = borrower
    group_pk = request.GET['group_pk']
    if group_pk != null:
        group = Group.objects.filter(id = group_pk)
        group.debts.append(debt)

def return_money(request):
    debt_pk = request.GET['pk']
    returned_amount = request.GET['amount']
    debt = Debt.objects.filter(id = debt_pk)
    before_amount = debt.amount
    after_amount = before_amount - returned_amount
    debt.amount = after_amount
    if after_amount == 0:
        debt.clear = True
    exchange = Exchange()
    exchange.payer = debt.borrower
    exchange.payee = debt.lender
    exchange.amount = amount
