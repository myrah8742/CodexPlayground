# CodexPlayground

## Kachess Bathymetry Viewer

This project contains a small web-based 3D viewer for bathymetric data of Lake Kachess, WA.

### Usage

1. Obtain a GeoTIFF bathymetry file for Lake Kachess and save it as `kachess.tif` in the project root.
2. Open `index.html` in a modern web browser. The page loads the GeoTIFF and renders a 3D mesh that you can pan, rotate, and zoom with the mouse.

The viewer uses [three.js](https://threejs.org/) for rendering and [geotiff.js](https://geotiffjs.github.io/) to parse the GeoTIFF file.
