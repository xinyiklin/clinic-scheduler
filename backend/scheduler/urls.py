from django.urls import path
from .views import (
    AppointmentListCreateView,
    AppointmentDetailView,
    CurrentUserView,
    PhysicianListView,
    AppointmentStatusListView,
    AppointmentTypeListView,
)

urlpatterns = [
    path("appointments/", AppointmentListCreateView.as_view(), name="appointment-list-create"),
    path("appointments/<int:pk>/", AppointmentDetailView.as_view(), name="appointment-detail"),
    path("me/", CurrentUserView.as_view(), name="current-user"),
    path("physicians/", PhysicianListView.as_view(), name="physician-list"),
    path("appointment-statuses/", AppointmentStatusListView.as_view(), name="appointment-status-list"),
    path("appointment-types/", AppointmentTypeListView.as_view(), name="appointment-type-list"),
]