from django.contrib import admin
from .models import Appointment, Facility, StaffProfile

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'patient_name',
        'doctor_name',
        'appointment_time',
        'status',
        'created_by_name',
        'created_at',
    )
    list_filter = ('status', 'doctor_name', 'created_at')
    search_fields = ('patient_name', 'doctor_name', 'reason', 'created_by_name')

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(StaffProfile)
class StaffProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'facility')