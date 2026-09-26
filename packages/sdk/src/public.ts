export * from "./index.js";
export type {
  WorkflowManifest,
  WorkflowPayloadEntry,
  WorkflowAgentEntry,
  WorkflowDependency,
  WorkflowScreenEntry,
} from "./workflow.js";
export type {
  RoleManifest,
  RolePayloadEntry,
} from "./role.js";

import type {
  Kind as LegacyKind,
  Manifest as LegacyManifest,
  PackageSummary as LegacyPackageSummary,
  PackageSearchResponse as LegacyPackageSearchResponse,
} from "./index.js";
import type { WorkflowManifest } from "./workflow.js";
import type { RoleManifest } from "./role.js";

/** All package kinds accepted by the current public SDK. */
export type Kind = LegacyKind | "workflow" | "role";

/**
 * Root manifest exposed by the public SDK. `workflow` and `role` are deliberately outside the legacy
 * editor-code surface: both are signed declarative orchestration data and receive no azphalt sandbox
 * capability.
 */
export type Manifest = Omit<LegacyManifest, "kind"> & {
  kind: Kind;
  workflow?: WorkflowManifest;
  role?: RoleManifest;
};

/** Browse/search summary widened to include orchestration-data kinds. */
export type PackageSummary = Omit<LegacyPackageSummary, "kind"> & {
  kind?: Kind;
};

/**
 * Browse/search response widened alongside PackageSummary. The legacy interface in index.ts is
 * lexically bound to the legacy summary kind union, so merely re-exporting it would reject
 * workflow/role summaries even though the public PackageSummary accepts them.
 */
export type PackageSearchResponse = Omit<LegacyPackageSearchResponse, "packages"> & {
  packages: PackageSummary[];
};
