from django.db import models
from django.contrib.auth.models import User
from colorfield.fields import ColorField


DEFAULT_APPOINTMENT_STATUSES = [
    {"code": "pending", "name": "Pending", "color": "#6c757d"},
    {"code": "check_in", "name": "Check In", "color": "#0d6efd"},
    {"code": "check_out", "name": "Check Out", "color": "#198754"},
    {"code": "cancelled", "name": "Cancelled", "color": "#dc3545"},
    {"code": "no_show", "name": "No Show", "color": "#fd7e14"},
]

DEFAULT_APPOINTMENT_TYPES = [
    {"code": "new_patient", "name": "New Patient", "color": "#20c997"},
    {"code": "follow_up", "name": "Follow Up", "color": "#6f42c1"},
    {"code": "annual", "name": "Annual", "color": "#198754"},
    {"code": "consult", "name": "Consult", "color": "#0dcaf0"},
    {"code": "procedure", "name": "Procedure", "color": "#ffc107"},
    {"code": "urgent", "name": "Urgent", "color": "#dc3545"},
]


class Facility(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)

        if is_new:
            for status in DEFAULT_APPOINTMENT_STATUSES:
                AppointmentStatus.objects.get_or_create(
                    facility=self,
                    code=status["code"],
                    defaults={
                        "name": status["name"],
                        "color": status["color"],
                        "is_active": True,
                    },
                )

            for appt_type in DEFAULT_APPOINTMENT_TYPES:
                AppointmentType.objects.get_or_create(
                    facility=self,
                    code=appt_type["code"],
                    defaults={
                        "name": appt_type["name"],
                        "color": appt_type["color"],
                        "is_active": True,
                    },
                )


class FacilityMembership(models.Model):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("physician", "Physician"),
        ("nurse", "Nurse"),
        ("staff", "Staff"),
        ("administrative", "Administrative"),
        ("biller", "Biller"),
    ]

    TITLE_CHOICES = [
        ("md", "MD"),
        ("do", "DO"),
        ("np", "NP"),
        ("pa", "PA"),
        ("rn", "RN"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="facility_memberships")
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name="memberships")
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default="staff")
    title = models.CharField(max_length=10, choices=TITLE_CHOICES, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("user", "facility")

    def __str__(self):
        return f"{self.user.username} - {self.facility.name} - {self.role}"


class AppointmentStatus(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name="appointment_statuses")
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50)
    color = ColorField(default="#6c757d")
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("facility", "code")

    def __str__(self):
        return f"{self.facility.name} - {self.name}"


class AppointmentType(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name="appointment_types")
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50)
    color = ColorField(default="#6f42c1")
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("facility", "code")

    def __str__(self):
        return f"{self.facility.name} - {self.name}"


class Appointment(models.Model):
    patient_name = models.CharField(max_length=100)
    doctor_name = models.CharField(max_length=100)
    appointment_time = models.DateTimeField()
    reason = models.TextField(blank=True)

    status = models.ForeignKey(
        AppointmentStatus,
        on_delete=models.PROTECT,
        related_name="appointments"
    )

    appointment_type = models.ForeignKey(
        AppointmentType,
        on_delete=models.PROTECT,
        related_name="appointments"
    )

    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    created_by_name = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.created_by and not self.created_by_name:
            self.created_by_name = self.created_by.get_full_name() or self.created_by.username
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.patient_name} with {self.doctor_name} at {self.appointment_time}"