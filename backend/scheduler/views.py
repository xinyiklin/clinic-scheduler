from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics, permissions
from .models import Appointment
from .serializers import AppointmentSerializer


@method_decorator(ensure_csrf_cookie, name='dispatch')
class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(
            facility=self.request.user.staffprofile.facility
        ).order_by('appointment_time')

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user,
            facility=self.request.user.staffprofile.facility
        )


class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(
            facility=self.request.user.staffprofile.facility
        )