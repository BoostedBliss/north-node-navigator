## 2023-11-09 - Memoizing static SVG rendering
**Learning:** `renderContinents` in `AstroMap.tsx` calculates SVG paths from coordinates on every render. Because the `CONTINENT_POLYGONS` coordinates never change and the conversion function `geoToSvgCoords` relies only on coordinates and fixed sizes, this produces the same result on every re-render (e.g. on every mouse drag or hover, or when date changes).
**Action:** Use `useMemo` to memoize the static continent paths. They should only be recalculated if something relevant changes (which never happens for `CONTINENT_POLYGONS`).

## 2024-05-18 - AstroMap React Memoization for Line Rendering
**Learning:** In highly interactive SVG maps, rendering hundreds of complex line paths for Astrocartography lines on every interaction (like hover) causes unnecessary re-renders of all lines. The `renderLinePath` dynamically maps geographic coordinates to SVG coordinates inline.
**Action:** Use `useCallback` to memoize the line rendering function, and `useMemo` to memoize the resulting array of lines, so they are only re-rendered when the lines themselves or specific dependencies (like `hoveredLine`) change.
