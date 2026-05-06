import type {
  FieldPath,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form";

import type { EntityId } from "../../shared/api/types";
import type { PatientLike, StaffLike } from "../../shared/types/domain";

export type PatientSelectOption = {
  id: EntityId;
  name: string;
};

export type PatientCareProvider = StaffLike & {
  id: EntityId;
};

export type EmergencyContactFormValues = {
  name: string;
  relationship: string;
  phone_number: string;
  is_primary: boolean;
  notes: string;
};

export type PatientFormValues = {
  first_name: string;
  middle_name: string;
  last_name: string;
  preferred_name: string;
  date_of_birth: string;
  gender: string;
  sex_at_birth: string;
  race: string;
  race_declined: boolean;
  ethnicity: string;
  ethnicity_declined: boolean;
  preferred_language: string;
  preferred_language_declined: boolean;
  pronouns: string;
  email: string;
  address_line_1: string;
  address_line_2: string;
  address_city: string;
  address_state: string;
  address_zip_code: string;
  phone_cell: string;
  phone_home: string;
  phone_work: string;
  emergency_contact_name: string;
  emergency_contact_relationship: string;
  emergency_contact_phone: string;
  emergency_contacts: EmergencyContactFormValues[];
  ssn: string;
  ssn_last4: string;
  pcp: string;
  referring_provider: string;
  preferred_pharmacy: string;
  is_active: boolean;
};

export type PatientRecord = PatientLike & {
  gender?: EntityId | null;
  sex_at_birth?: string | null;
  race?: string | null;
  race_declined?: boolean | null;
  ethnicity?: string | null;
  ethnicity_declined?: boolean | null;
  preferred_language?: string | null;
  preferred_language_declined?: boolean | null;
  pronouns?: string | null;
  email?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_relationship?: string | null;
  emergency_contact_phone?: string | null;
  emergency_contacts?: EmergencyContactFormValues[] | null;
  ssn_last4?: string | null;
  pcp?: EntityId | null;
  referring_provider?: EntityId | null;
  preferred_pharmacy?: EntityId | null;
  is_active?: boolean | null;
};

export type RegisterFormattedField = <
  TName extends FieldPath<PatientFormValues>,
>(
  name: TName,
  options?: RegisterOptions<PatientFormValues, TName>
) => UseFormRegisterReturn<TName>;
