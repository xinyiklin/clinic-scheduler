from django.db import models
from django.contrib.auth.models import User


class Facility(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class StaffProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} - {self.facility.name}"


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('check_in', 'Check In'),
        ('check_out', 'Check Out'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]

    patient_name = models.CharField(max_length=100)
    doctor_name = models.CharField(max_length=100)
    appointment_time = models.DateTimeField()
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

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