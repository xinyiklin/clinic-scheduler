import type { EntityId } from "../api/types";

export type FacilityLike = {
  id?: EntityId;
  name?: string | null;
  timezone?: string | null;
  operating_start_time?: string | null;
  operating_end_time?: string | null;
  operating_days?: Array<string | number> | null;
};

export type ResourceLike = {
  id?: EntityId;
  key?: string;
  name?: string | null;
  linked_staff_name?: string | null;
  resourceId?: EntityId;
};

export type ResourceDefinition = {
  key: string;
  label: string;
  resourceId?: EntityId;
};

export type PatientLike = {
  id?: EntityId;
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  preferred_name?: string | null;
  patient_first_name?: string | null;
  patient_middle_name?: string | null;
  patient_last_name?: string | null;
  patient_preferred_name?: string | null;
  patient_name?: string | null;
  full_name?: string | null;
  display_name?: string | null;
  date_of_birth?: string | null;
  chart_number?: string | number | null;
};

export type AppointmentLike = PatientLike & {
  id?: EntityId;
  patient_id?: EntityId | null;
  patient_date_of_birth?: string | null;
  patient_chart_number?: string | number | null;
  resource?: EntityId | null;
  resource_name?: string | null;
  rendering_provider?: EntityId | null;
  rendering_provider_name?: string | null;
  rendering_provider_role_name?: string | null;
  rendering_provider_title_name?: string | null;
  room?: string | null;
  reason?: string | null;
  notes?: string | null;
  status?: EntityId | null;
  status_name?: string | null;
  status_code?: string | null;
  status_color?: string | null;
  appointment_type?: EntityId | null;
  appointment_type_name?: string | null;
  appointment_type_code?: string | null;
  appointment_type_color?: string | null;
  facility?: EntityId | null;
  created_by_name?: string | null;
  appointment_time?: string | null;
  duration_minutes?: number | string | null;
  end_time?: string | null;
  date?: string | null;
  time?: string | null;
  end_date?: string | null;
  end_time_str?: string | null;
};

export type ScheduleWindow = {
  startMinute: number;
  endMinute: number;
};
