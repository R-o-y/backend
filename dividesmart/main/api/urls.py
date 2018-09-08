from django.conf.urls import url, include
from . import views

urlpatterns = [
    # url(r'user$', views.get_current_user),

    # url(r'users/(?P<pk>\d+)', views.UserAPIView.as_view()),

    # url(r'signin$', views.sign_in),

    # url(r'signin/google$', views.google_sign_in),

    # url(r'signin/facebook$', views.facebook_sign_in),

    # url(r'signoff', views.sign_off),

    url(r'ocr', views.parse_receipt),

    url(r'get_friends_list', views.get_friends_list),

    url(r'get_debts_list', views.get_debts_list),

    url(r'get_groups_list', views.get_groups_list),

    url(r'get_all_lends', views.get_all_lends),

    url(r'get_all_borrows', views.get_all_borrows),

    url(r'get_friend_lends', views.get_friend_lends),

    url(r'get_friend_borrows', views.get_friend_borrows),

    url(r'get_group_debts', views.get_group_debts),

    url(r'create_group', views.create_group),

    url(r'add_group_member', views.add_group_member),

    url(r'create_debt', views.create_debt),
]
