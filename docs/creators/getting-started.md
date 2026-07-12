# Getting Started for Creators

`azphalt` allows you to take assets you create—like brushes, shaders, sound effects, or 3D models—and bundle them into a single `.azp` file that works across all supported host applications.

## Creating an Asset Pack

The fastest way to create a complex asset pack is using the official scaffolding tool. (Coming very soon via `@azphalt/create`!)

If you want to package a single asset quickly, you can use one of our dedicated CLI importers.

### Packaging a Video Overlay

1. Ensure you have Node.js installed.
2. Run the video importer on your asset:
   ```bash
   npx @azphalt/importer-video my-explosion.webm explosion-pack.azp
   ```
3. Your `explosion-pack.azp` is now ready to be uploaded to any `azphalt` repository or dragged-and-dropped directly into compatible host apps!

### Available CLI Importers
- `@azphalt/importer-abr`: Convert Adobe Photoshop Brushes
- `@azphalt/importer-cube`: Convert 3D LUTs for color grading
- `@azphalt/importer-isf`: Convert Interactive Shader Format shaders
- `@azphalt/importer-gltf`: Package 3D meshes
- `@azphalt/importer-hdri`: Package Environment lighting maps
- `@azphalt/importer-material`: Package PBR textures (Albedo, Normal, Roughness)
- `@azphalt/importer-motion`: Package easing curves
- `@azphalt/importer-palette`: Package Adobe Swatch Exchange files
- `@azphalt/importer-image`: Package standard decals and textures
- `@azphalt/importer-video`: Package footage and VFX loops
- `@azphalt/importer-font`: Package typography
- `@azphalt/importer-audio`: Package SFX and music stems

## What's Next?
- Check out the [Manifest Schema](/specs/extension-manifest) to see how you can manually write a complex `manifest.json` for multi-asset packs.
