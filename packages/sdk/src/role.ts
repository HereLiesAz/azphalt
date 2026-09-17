/**
 * First-class declarative role package types for `kind:"role"`.
 *
 * A role package contains one or more host-defined role/persona definitions. It executes no code and
 * receives no azphalt sandbox capabilities; a compatible host decides how the role is represented and
 * whether installing the package adds it to the user's available role/company roster.
 */
export interface RoleManifest {
  /** Host-defined role payload format/version, e.g. `haive.role.v1`. */
  format: string;
  /** One or more complete role definitions bundled in the package. */
  roles: RolePayloadEntry[];
}

/** A named payload file containing one declarative role definition. */
export interface RolePayloadEntry {
  id: string;
  name?: string;
  description?: string;
  path: string;
}
