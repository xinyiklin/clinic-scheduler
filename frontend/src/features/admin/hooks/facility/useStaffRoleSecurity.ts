import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateStaffRole } from "../../api/facility/staff";

import type { ApiPayload, EntityId } from "../../../../shared/api/types";

type RoleSecurityPayload = {
  roleId: EntityId;
  values: ApiPayload;
};

function getStaffQueryKey(facilityId: EntityId | null | undefined) {
  return ["admin", "facility", facilityId || null, "staff"];
}

function getFacilityConfigQueryKey(
  key: string,
  facilityId: EntityId | null | undefined
) {
  return ["facilityConfig", key, facilityId || null];
}

export default function useStaffRoleSecurity(
  facilityId: EntityId | null | undefined
) {
  const queryClient = useQueryClient();

  const roleSecurityMutation = useMutation({
    mutationFn: async ({ roleId, values }: RoleSecurityPayload) => {
      if (!facilityId) return null;
      return updateStaffRole(facilityId, roleId, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getFacilityConfigQueryKey("staffRoles", facilityId),
      });
      queryClient.invalidateQueries({
        queryKey: getStaffQueryKey(facilityId),
      });
    },
  });

  const updateRoleSecurity = async (roleId: EntityId, values: ApiPayload) => {
    if (!facilityId) return;
    return roleSecurityMutation.mutateAsync({ roleId, values });
  };

  return {
    saving: roleSecurityMutation.isPending,
    error: roleSecurityMutation.error?.message || "",
    updateRoleSecurity,
  };
}
