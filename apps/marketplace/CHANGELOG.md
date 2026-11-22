# @azphalt/marketplace

## 0.1.11

### Patch Changes

- 15174ad: Every "not installed" state now offers the button that resolves it. `@azphalt/web-handoff` gains a pure
  `requiredActionsFor` / `notInstalledStateFor` / `buttonStateFor` mapping (mirrored in the Compose
  storefront), the "no host installed" fallback gets an Install button per host (and, with no listed host, says so
  and offers only Download and Retry), a failed install is always retried as an install (never sent back
  through checkout), and `isHeld` no longer counts `downloaded` or `failed` as installed.
- Updated dependencies [15174ad]
  - @azphalt/web-handoff@0.4.1

## 0.1.10

### Patch Changes

- Updated dependencies [34c6888]
  - @azphalt/repository-client@0.5.0

## 0.1.9

### Patch Changes

- Updated dependencies [97aaf3a]
  - @azphalt/azdk@0.8.0
  - @azphalt/repository-client@0.4.2

## 0.1.8

### Patch Changes

- Updated dependencies [c2e8908]
  - @azphalt/azdk@0.7.0
  - @azphalt/repository-client@0.4.1

## 0.1.7

### Patch Changes

- Updated dependencies [19c0df7]
- Updated dependencies [a04a765]
- Updated dependencies [c0c8ee4]
- Updated dependencies [fffb800]
- Updated dependencies [5b51e82]
- Updated dependencies [b32adc4]
- Updated dependencies [2f85213]
- Updated dependencies [15dc31c]
- Updated dependencies [d6f56c9]
  - @azphalt/azdk@0.6.0
  - @azphalt/repository-client@0.4.0
  - @azphalt/web-handoff@0.4.0

## 0.1.6

### Patch Changes

- Updated dependencies [f36110b]
  - @azphalt/azdk@0.5.0
  - @azphalt/repository-client@0.3.2

## 0.1.5

### Patch Changes

- Updated dependencies [bdbdb9b]
  - @azphalt/azdk@0.4.0
  - @azphalt/repository-client@0.3.1

## 0.1.4

### Patch Changes

- Updated dependencies
  - @azphalt/web-handoff@0.3.0

## 0.1.3

### Patch Changes

- Updated dependencies [e5108c8]
  - @azphalt/azdk@0.3.0
  - @azphalt/repository-client@0.3.0
  - @azphalt/web-handoff@0.2.0

## 0.1.2

### Patch Changes

- Updated dependencies [5a7869b]
- Updated dependencies [f9a94c8]
- Updated dependencies [9894f9a]
- Updated dependencies [955c1f4]
- Updated dependencies [821325d]
  - @azphalt/azdk@0.2.0
  - @azphalt/repository-client@0.2.0
