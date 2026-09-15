export * from "./index.js";
export type {
  WorkflowManifest,
  WorkflowPayloadEntry,
  WorkflowAgentEntry,
  WorkflowDependency,
  WorkflowScreenEntry,
} from "./workflow.js";

import type {
  Kind as LegacyKind,
  Manifest as LegacyManifest,
  PackageSummary as LegacyPackageSummary,
} from "./index.js";
import type { WorkflowManifest } from "./workflow.js";

/** All package kinds accepted by the current public SDK. */
export type Kind = LegacyKind | "workflow";

/**
 * Root manifest exposed by the public SDK. `workflow` is deliberately outside the legacy editor-code
 * surface: a workflow package is signed orchestration data and receives no azphalt sandbox capability.
 */
export type Manifest = Omit<LegacyManifest, "kind"> & {
  kind: Kind;
  workflow?: WorkflowManifest;
};

/** Browse/search summary widened to include the workflow kind. */
export type PackageSummary = Omit<LegacyPackageSummary, "kind"> & {
  kind?: Kind;
};
