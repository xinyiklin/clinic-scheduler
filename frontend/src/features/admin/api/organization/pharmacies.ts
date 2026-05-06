import { apiRequest } from "../../../../shared/api/client";

import type { ApiPayload, EntityId } from "../../../../shared/api/types";
import type { ApiRecord } from "../../../../shared/types/domain";

export function fetchOrganizationPharmacies() {
  return apiRequest<ApiRecord[]>("/organizations/pharmacies/");
}

export function createOrganizationPharmacy(data: ApiPayload) {
  return apiRequest<ApiRecord>("/organizations/pharmacies/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateOrganizationPharmacy(id: EntityId, data: ApiPayload) {
  return apiRequest<ApiRecord>(`/organizations/pharmacies/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
