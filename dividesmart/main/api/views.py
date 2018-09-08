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

from ..models import User, Group, Exchange, Debt

from PIL import Image
import pytesseract


def parse_receipt(request):
    receipt = request.FILES['receipt']
    content = pytesseract.image_to_string(Image.open(receipt))
    return JsonResponse({
        'content': content
    })


def get_friends_list(request):
    user = get_user(request)
    friends = list(user.friends.all())
    data = {
        'friends': friends
    }
    return JsonResponse(data)


def get_debts_list(request):
    user = get_user(request)
    result_list = list(user.debts.filter(clear=False))
    data = {
        'debts': result_list
    }
    return JsonResponse(data)


def get_groups_list(request):
    user = get_user(request)
    groups = list(user.groups.all())
    data = {
        'groups': groups
    }
    return JsonResponse(data)


def get_all_lends(request):
    user = get_user(request)
    debts = user.debts.filter(Q(clear=False) & Q(lender=user))
    data = {
        'lends': list(debts)
    }
    return JsonResponse(data)


def get_all_borrows(request):
    user = get_user(request)
    debts = user.debts.filter(Q(clear=False) & Q(borrower=user))
    data = {
        'borrows': list(debts)
    }
    return JsonResponse(data)


def get_friend_lends(request):
    user = get_user(request)
    friend_pk = request.GET['friend_pk']
    friend = User.objects.filter(id=friend_pk)
    debts = user.debts.filter(Q(clear=False) & Q(borrower=friend) & Q(lender=user))
    data = {
        'friend_lends': list(debts)
    }
    return JsonResponse(data)


def get_friend_borrows(request):
    user = get_user(request)
    friend_pk = request.GET['friend_pk']
    friend = User.objects.filter(id=friend_pk)
    debts = user.debts.filter(Q(clear=False) & Q(lender=friend) & Q(borrower=user))
    data = {
        'friend_borrows': list(debts)
    }
    return JsonResponse(data)


def get_group_debts(request):
    group_pk = request.GET['group_pk']
    group = Group.objects.filter(id=group_pk)
    debts = group.debts.all()
    data = {
        'debts': list(debts)
    }
    return JsonResponse(data)


def create_group(request):
    name = request.POST['name']
    creator = get_user(request)
    group = Group()
    group.name = name
    group.creator = creator
    group.save()
    return HttpResponse()


def add_group_member(request):
    member_pk = request.POST['member_pk']
    member = User.objects.filter(id=member_pk)
    group_pk = request.POST['group_pk']
    group = Group.objects.filter(id=group_pk)
    group.members.add(member)
    return HttpResponse()


def create_debt(request):
    lender_pk = request.POST['lender_pk']
    lender = User.objects.filter(id=lender_pk)
    borrower_pk = request.POST['borrower_pk']
    borrower = User.objects.filter(id=borrower_pk)
    amount = request.POST['amount']
    debt = Debt()
    debt.amount = amount
    debt.lender = lender
    debt.borrower = borrower
    debt.save()
    group_pk = request.POST['group_pk']
    if 'group_pk' in request.POST:
        group = Group.objects.filter(id=group_pk)
        group.debts.add(debt)
    return HttpResponse()


def return_money(request):
    debt_pk = request.POST['debt_pk']
    returned_amount = request.POST['amount']
    debt = Debt.objects.filter(id=debt_pk)
    before_amount = debt.amount
    after_amount = before_amount - returned_amount
    debt.amount = after_amount
    debt.save()
    if after_amount == 0:
        debt.clear = True
    exchange = Exchange()
    exchange.payer = debt.borrower
    exchange.payee = debt.lender
    exchange.amount = returned_amount
    exchange.save()
    return HttpResponse()




