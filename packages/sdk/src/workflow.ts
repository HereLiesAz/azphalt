/**
 * First-class orchestration-data package types for `kind:"workflow"`.
 *
 * Workflow packages are signed declarative data. They do not execute inside the azphalt sandbox and
 * do not receive azphalt capabilities. A workflow-aware host validates and interprets the referenced
 * payload files using its own already-installed workflow/agent runtime.
 */
export interface WorkflowManifest {
  /** Host-defined workflow payload format/version, e.g. `haive.workflow.v1`. */
  format: string;
  /** One or more complete workflow definitions bundled in the package. */
  definitions: WorkflowPayloadEntry[];
  /** Optional reusable workflow fragments/subgraphs. */
  fragments?: WorkflowPayloadEntry[];
  /** Optional agent/role definitions available to the package's workflows. */
  agents?: WorkflowAgentEntry[];
  /** Other packages this workflow package refers to. Each retains its own entitlement lifecycle. */
  dependencies?: WorkflowDependency[];
  /** Optional declarative native-screen descriptions interpreted by the host. */
  screens?: WorkflowScreenEntry[];
  /**
   * Opaque symbolic host permission requests. These strings grant NOTHING in azphalt. The target host
   * decides which names it recognizes and separately obtains user/host approval before granting any.
   */
  hostPermissions?: string[];
}

/** A named payload file containing a workflow definition or fragment. */
export interface WorkflowPayloadEntry {
  id: string;
  name?: string;
  description?: string;
  path: string;
}

/** A named payload file containing an agent/role definition. */
export interface WorkflowAgentEntry {
  id: string;
  name?: string;
  description?: string;
  path: string;
}

/** A reference to another independently resolved azphalt package. */
export interface WorkflowDependency {
  id: string;
  version?: string;
  required?: boolean;
  purpose?: "model" | "mcp" | "skill" | "script" | "workflow" | "tool" | (string & {});
  note?: string;
}

/** A declarative native-screen payload a host may render at symbolic placements. */
export interface WorkflowScreenEntry {
  id: string;
  name?: string;
  path: string;
  placements?: string[];
}
