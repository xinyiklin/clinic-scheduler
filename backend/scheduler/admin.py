from django.contrib import admin
from .models import (
    Appointment,
    Facility,
    FacilityMembership,
    AppointmentStatus,
    AppointmentType,
)


class AppointmentStatusInline(admin.TabularInline):
    model = AppointmentStatus
    extra = 0


class AppointmentTypeInline(admin.TabularInline):
    model = AppointmentType
    extra = 0


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "patient_name",
        "doctor_name",
        "appointment_time",
        "status",
        "appointment_type",
        "facility",
        "created_by_name",
        "created_at",
    )
    list_filter = (
        "status",
        "appointment_type",
        "doctor_name",
        "facility",
        "created_at",
    )
    search_fields = (
        "patient_name",
        "doctor_name",
        "reason",
        "created_by_name",
    )


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    inlines = [AppointmentStatusInline, AppointmentTypeInline]


@admin.register(FacilityMembership)
class FacilityMembershipAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "facility", "role", "title", "is_active")
    list_filter = ("role", "title", "facility", "is_active")
    search_fields = ("user__username", "facility__name")