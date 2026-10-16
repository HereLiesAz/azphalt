---
"create-azphalt": patch
---

Fix the scaffolder's git `user.name` default (it called `require()` inside an ES module, so the error was swallowed and the author prompt always started empty), stop an "Other" licence choice from leaving the template's `MIT` in `package.json`, and bring `template-host-app` back to the repository's `vite` range. A new test (`tools/template-versions.test.mjs`) fails whenever a template falls behind a workspace package's release line or the repository's shared tooling ranges, and Dependabot now covers the template manifests.
