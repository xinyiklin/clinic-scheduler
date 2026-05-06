import { useQuery } from "@tanstack/react-query";

import { fetchPatientDocuments } from "../api/documents";

import type { EntityId } from "../../../shared/api/types";
import type { ApiRecord } from "../../../shared/types/domain";

type UsePatientDocumentsOptions = {
  facilityId?: EntityId | null;
  patientId?: EntityId | null;
  initialDocuments?: ApiRecord[];
};

export function getPatientDocumentsQueryKey(
  facilityId: EntityId | null | undefined,
  patientId: EntityId | null | undefined
) {
  return ["patientDocuments", facilityId || null, patientId || null];
}

export default function usePatientDocuments({
  facilityId,
  patientId,
  initialDocuments = [],
}: UsePatientDocumentsOptions) {
  const documentsQuery = useQuery({
    queryKey: getPatientDocumentsQueryKey(facilityId, patientId),
    queryFn: () => fetchPatientDocuments({ facilityId, patientId }),
    enabled: !!facilityId && !!patientId,
    initialData: initialDocuments.length ? initialDocuments : undefined,
  });

  return {
    documents: documentsQuery.data || [],
    error: documentsQuery.error?.message || "",
    loading: documentsQuery.isLoading,
    refetch: documentsQuery.refetch,
  };
}
