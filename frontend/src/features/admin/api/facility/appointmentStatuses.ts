import { apiRequest } from "../../../../shared/api/client";
import { facilityParams } from "./scope";

import type { ApiPayload, EntityId } from "../../../../shared/api/types";
import type { ApiRecord } from "../../../../shared/types/domain";

export function fetchAppointmentStatuses(
  facilityId: EntityId | null | undefined
) {
  return apiRequest<ApiRecord[]>("/facilities/appointment-statuses/", {
    includeFacilityId: !facilityId,
    params: facilityParams(facilityId),
  });
}

export function createAppointmentStatus(
  facilityId: EntityId | null | undefined,
  data: ApiPayload
) {
  return apiRequest<ApiRecord>("/facilities/appointment-statuses/", {
    method: "POST",
    includeFacilityId: !facilityId,
    params: facilityParams(facilityId),
    body: JSON.stringify(data),
  });
}

export function updateAppointmentStatus(
  facilityId: EntityId | null | undefined,
  id: EntityId,
  data: ApiPayload
) {
  return apiRequest<ApiRecord>(`/facilities/appointment-statuses/${id}/`, {
    method: "PATCH",
    includeFacilityId: !facilityId,
    params: facilityParams(facilityId),
    body: JSON.stringify(data),
  });
}

export function deleteAppointmentStatus(
  facilityId: EntityId | null | undefined,
  id: EntityId
) {
  return apiRequest<ApiRecord>(`/facilities/appointment-statuses/${id}/`, {
    method: "DELETE",
    includeFacilityId: !facilityId,
    params: facilityParams(facilityId),
  });
}
