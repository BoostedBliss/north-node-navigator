## 2023-11-09 - Memoizing static SVG rendering
**Learning:** `renderContinents` in `AstroMap.tsx` calculates SVG paths from coordinates on every render. Because the `CONTINENT_POLYGONS` coordinates never change and the conversion function `geoToSvgCoords` relies only on coordinates and fixed sizes, this produces the same result on every re-render (e.g. on every mouse drag or hover, or when date changes).
**Action:** Use `useMemo` to memoize the static continent paths. They should only be recalculated if something relevant changes (which never happens for `CONTINENT_POLYGONS`).

## 2024-05-18 - Heavy SVG path re-rendering on mouse events (Astrocartography map)
**Learning:** In interactive mapping components like `AstroMap.tsx`, computing SVG paths dynamically (calling `geoToSvgCoords` and array mapping for hundreds of points) on every re-render causes severe main thread lag, especially when component state updates continuously (e.g. tracking `pan` coordinates on mouse move).
**Action:** Always memoize (`useMemo`) complex/heavy SVG geometry generation that only depends on stable lists (like data points) and hover states, decoupling it from the fast-updating viewport transform state (like `pan` and `zoom`) which can just scale/translate a parent `<g>` wrapper.
