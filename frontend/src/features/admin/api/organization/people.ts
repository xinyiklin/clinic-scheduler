import { apiRequest } from "../../../../shared/api/client";

import type { ApiPayload, EntityId } from "../../../../shared/api/types";
import type { UserProfile } from "../../../../shared/types/domain";

export function fetchOrganizationPeople() {
  return apiRequest<UserProfile[]>("/organizations/people/");
}

export function fetchOrganizationPerson(id: EntityId) {
  return apiRequest<UserProfile>(`/organizations/people/${id}/`);
}

export function createOrganizationPerson(data: ApiPayload) {
  return apiRequest<UserProfile>("/organizations/people/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateOrganizationPerson(id: EntityId, data: ApiPayload) {
  return apiRequest<UserProfile>(`/organizations/people/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
