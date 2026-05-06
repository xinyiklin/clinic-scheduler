import { useQuery } from "@tanstack/react-query";

import { fetchAppointmentHeatmap } from "../../appointments/api/appointments";

import type { ApiParamValue, EntityId } from "../../../shared/api/types";

type UseScheduleHeatmapOptions = {
  facilityId?: EntityId | null;
  month?: ApiParamValue;
};

export default function useScheduleHeatmap({
  facilityId,
  month,
}: UseScheduleHeatmapOptions) {
  const heatmapQuery = useQuery({
    queryKey: ["appointmentHeatmap", facilityId, month],
    queryFn: () => fetchAppointmentHeatmap({ facilityId, month }),
    enabled: !!facilityId && !!month,
    staleTime: 60_000,
  });

  return {
    counts: heatmapQuery.data?.counts || {},
    loading: heatmapQuery.isLoading,
    error: heatmapQuery.error?.message || "",
  };
}
