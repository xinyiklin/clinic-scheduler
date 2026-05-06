import { useCallback, useEffect, useRef, useState } from "react";

import {
  beginAppointmentEditSession,
  heartbeatAppointmentEditSession,
  releaseAppointmentEditSession,
} from "../api/appointments";
import { getErrorMessage } from "../../../shared/utils/errors";

const HEARTBEAT_INTERVAL_MS = 45_000;

type AppointmentEditSessionStatus =
  | "idle"
  | "checking"
  | "active"
  | "available"
  | "occupied"
  | "error";

type AppointmentEditSessionActiveEditor = {
  user_id?: number | string | null;
  user_name?: string | null;
  started_at?: string | null;
  last_seen_at?: string | null;
} | null;

type AppointmentEditSessionResult = {
  status?: AppointmentEditSessionStatus;
  active_editor?: AppointmentEditSessionActiveEditor;
};

type AppointmentEditSessionState = {
  status: AppointmentEditSessionStatus;
  activeEditor: AppointmentEditSessionActiveEditor;
  error: string;
};

type UseAppointmentEditSessionArgs = {
  appointmentId?: number | string | null;
  facilityId?: number | string | null;
  isOpen: boolean;
  mode?: string;
};

const idleState: AppointmentEditSessionState = {
  status: "idle",
  activeEditor: null,
  error: "",
};

export default function useAppointmentEditSession({
  appointmentId,
  facilityId,
  isOpen,
  mode,
}: UseAppointmentEditSessionArgs) {
  const [state, setState] = useState<AppointmentEditSessionState>(idleState);
  const requestIdRef = useRef(0);
  const shouldManageSession = Boolean(
    isOpen && mode === "edit" && appointmentId && facilityId
  );

  const applySessionResult = useCallback(
    (result: AppointmentEditSessionResult | null) => {
      setState({
        status: result?.status || "idle",
        activeEditor: result?.active_editor || null,
        error: "",
      });
    },
    []
  );

  const beginSession = useCallback(async () => {
    if (!shouldManageSession) return null;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setState((current) => ({
      ...current,
      status: "checking",
      error: "",
    }));

    try {
      const result = (await beginAppointmentEditSession(
        facilityId,
        appointmentId
      )) as AppointmentEditSessionResult;
      if (requestIdRef.current === requestId) {
        applySessionResult(result);
      }
      return result;
    } catch (error) {
      if (requestIdRef.current === requestId) {
        setState({
          status: "error",
          activeEditor: null,
          error: getErrorMessage(error, "Could not confirm editing status."),
        });
      }
      return null;
    }
  }, [appointmentId, applySessionResult, facilityId, shouldManageSession]);

  useEffect(() => {
    if (!shouldManageSession) {
      requestIdRef.current += 1;
      setState(idleState);
      return undefined;
    }

    beginSession();

    return () => {
      requestIdRef.current += 1;
      releaseAppointmentEditSession(facilityId, appointmentId).catch(() => {});
    };
  }, [appointmentId, beginSession, facilityId, shouldManageSession]);

  useEffect(() => {
    if (!shouldManageSession || state.status !== "active") return undefined;

    const intervalId = window.setInterval(() => {
      heartbeatAppointmentEditSession(facilityId, appointmentId)
        .then(applySessionResult)
        .catch((error) => {
          setState({
            status: "error",
            activeEditor: null,
            error: getErrorMessage(
              error,
              "Could not keep editing status current."
            ),
          });
        });
    }, HEARTBEAT_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [
    appointmentId,
    applySessionResult,
    facilityId,
    shouldManageSession,
    state.status,
  ]);

  return {
    ...state,
    beginSession,
    isBlockedByActiveEditor: state.status === "occupied",
    isChecking: state.status === "checking",
  };
}
