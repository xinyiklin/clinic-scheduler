import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchPhysicianList,
  fetchAppointmentStatuses,
  fetchAppointmentTypes,
  fetchFacilityResources,
  fetchPatientGenders,
  fetchCareProviders,
  fetchPharmacies,
  fetchStaffList,
  fetchStaffRoles,
  fetchStaffTitles,
} from "../api/facilities";

import type { UseQueryResult } from "@tanstack/react-query";
import type { EntityId } from "../../../shared/api/types";
import type { ApiRecord } from "../../../shared/types/domain";

type FacilityConfigRecord = ApiRecord & {
  is_active?: boolean | null;
};

type FacilityConfigFetcher = (
  facilityId: EntityId | null | undefined
) => Promise<FacilityConfigRecord[] | null>;

type FacilityConfigQueryOptions = {
  key: string;
  facilityId: EntityId | null | undefined;
  enabled: boolean;
  fetcher: FacilityConfigFetcher;
};

type FacilityConfigDataOptions = {
  facilityId: EntityId | null | undefined;
  enabled?: boolean;
};

function useFacilityConfigQuery({
  key,
  facilityId,
  enabled,
  fetcher,
}: FacilityConfigQueryOptions): UseQueryResult<
  FacilityConfigRecord[] | null,
  Error
> {
  return useQuery({
    queryKey: ["facilityConfig", key, facilityId || null],
    queryFn: () => fetcher(facilityId),
    enabled,
  });
}

const EMPTY_ARRAY: FacilityConfigRecord[] = [];

function getArray(data: FacilityConfigRecord[] | null | undefined) {
  return Array.isArray(data) ? data : EMPTY_ARRAY;
}

function getActiveRecords(data: FacilityConfigRecord[] | null | undefined) {
  if (!Array.isArray(data)) return EMPTY_ARRAY;
  return data.filter((record) => record?.is_active !== false);
}

export default function useFacilityConfigData({
  facilityId,
  enabled = true,
}: FacilityConfigDataOptions) {
  const isEnabled = enabled && !!facilityId;

  const physicianListQuery = useFacilityConfigQuery({
    key: "physicians",
    facilityId,
    enabled: isEnabled,
    fetcher: fetchPhysicianList,
  });

  const staffListQuery = useFacilityConfigQuery({
    key: "staff",
    facilityId,
    enabled: isEnabled,
    fetcher: fetchStaffList,
  });

  const statusOptionsQuery = useFacilityConfigQuery({
    key: "appointmentStatuses",
    facilityId,
    enabled: isEnabled,
    fetcher: fetchAppointmentStatuses,
  });

  const typeOptionsQuery = useFacilityConfigQuery({
    key: "appointmentTypes",
    facilityId,
    enabled: isEnabled,
    fetcher: fetchAppointmentTypes,
  });

  const resourcesQuery = useFacilityConfigQuery({
    key: "resources",
    facilityId,
    enabled: isEnabled,
    fetcher: fetchFacilityResources,
  });

  const genderOptionsQuery = useFacilityConfigQuery({
    key: "patientGenders",
    facilityId,
    enabled: isEnabled,
    fetcher: fetchPatientGenders,
  });

  const rolesQuery = useFacilityConfigQuery({
    key: "staffRoles",
    facilityId,
    enabled: isEnabled,
    fetcher: fetchStaffRoles,
  });

  const titlesQuery = useFacilityConfigQuery({
    key: "staffTitles",
    facilityId,
    enabled: isEnabled,
    fetcher: fetchStaffTitles,
  });

  const careProvidersQuery = useFacilityConfigQuery({
    key: "careProviders",
    facilityId,
    enabled: isEnabled,
    fetcher: fetchCareProviders,
  });

  const pharmaciesQuery = useFacilityConfigQuery({
    key: "pharmacies",
    facilityId,
    enabled: isEnabled,
    fetcher: fetchPharmacies,
  });

  const queries = [
    physicianListQuery,
    staffListQuery,
    statusOptionsQuery,
    typeOptionsQuery,
    resourcesQuery,
    genderOptionsQuery,
    rolesQuery,
    titlesQuery,
    careProvidersQuery,
    pharmaciesQuery,
  ];

  const reload = async () => {
    await Promise.all(queries.map((query) => query.refetch()));
  };

  const physicians = useMemo(
    () => getArray(physicianListQuery.data),
    [physicianListQuery.data]
  );
  const staffs = useMemo(
    () => getArray(staffListQuery.data),
    [staffListQuery.data]
  );
  const statusOptions = useMemo(
    () => getArray(statusOptionsQuery.data),
    [statusOptionsQuery.data]
  );
  const typeOptions = useMemo(
    () => getArray(typeOptionsQuery.data),
    [typeOptionsQuery.data]
  );
  const resources = useMemo(
    () => getActiveRecords(resourcesQuery.data),
    [resourcesQuery.data]
  );
  const genderOptions = useMemo(
    () => getArray(genderOptionsQuery.data),
    [genderOptionsQuery.data]
  );
  const roles = useMemo(() => getArray(rolesQuery.data), [rolesQuery.data]);
  const titles = useMemo(() => getArray(titlesQuery.data), [titlesQuery.data]);
  const careProviders = useMemo(
    () => getActiveRecords(careProvidersQuery.data),
    [careProvidersQuery.data]
  );
  const pharmacies = useMemo(
    () => getActiveRecords(pharmaciesQuery.data),
    [pharmaciesQuery.data]
  );

  return {
    physicians,
    staffs,
    statusOptions,
    typeOptions,
    resources,
    genderOptions,
    roles,
    titles,
    careProviders,
    pharmacies,
    loading: queries.some((query) => query.isLoading),
    isLoading: queries.some((query) => query.isLoading),
    error: queries.find((query) => query.error)?.error?.message || "",
    isError: queries.some((query) => query.isError),
    reload,
  };
}
