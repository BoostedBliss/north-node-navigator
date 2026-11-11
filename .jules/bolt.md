## 2023-11-09 - Memoizing static SVG rendering
**Learning:** `renderContinents` in `AstroMap.tsx` calculates SVG paths from coordinates on every render. Because the `CONTINENT_POLYGONS` coordinates never change and the conversion function `geoToSvgCoords` relies only on coordinates and fixed sizes, this produces the same result on every re-render (e.g. on every mouse drag or hover, or when date changes).
**Action:** Use `useMemo` to memoize the static continent paths. They should only be recalculated if something relevant changes (which never happens for `CONTINENT_POLYGONS`).

## 2024-11-09 - Memoize SVG Paths for Geospatial Rendering
**Learning:** In geospatial rendering components like `AstroMap`, mapping complex geographic coordinates (continents, lines) to SVG paths directly in the render cycle causes significant performance drops, especially during rapid state updates like panning, zooming, or date changes.
**Action:** Pre-calculate and memoize the SVG paths using `useMemo` so that they only recalculate when their specific dependencies (like the zoom/pan level, or the raw data points) change. This prevents massive frame drops.
