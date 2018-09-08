import random

from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.core.mail import EmailMessage  # for sending verification using e-mail
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render

from PIL import Image
import pytesseract


def parse_receipt(request):
    receipt = request.FILES['receipt']
    content = pytesseract.image_to_string(Image.open(receipt))
    return JsonResponse({
        'content': content
    })
