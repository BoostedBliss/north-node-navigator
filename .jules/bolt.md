## 2023-11-09 - Memoizing static SVG rendering
**Learning:** `renderContinents` in `AstroMap.tsx` calculates SVG paths from coordinates on every render. Because the `CONTINENT_POLYGONS` coordinates never change and the conversion function `geoToSvgCoords` relies only on coordinates and fixed sizes, this produces the same result on every re-render (e.g. on every mouse drag or hover, or when date changes).
**Action:** Use `useMemo` to memoize the static continent paths. They should only be recalculated if something relevant changes (which never happens for `CONTINENT_POLYGONS`).
## 2023-11-09 - Memoizing complex geospatial SVG rendering
**Learning:** In `src/components/AstroMap.tsx`, the `renderLinePath` function was generating the complex SVG string on every re-render (which includes panning/zooming via state). This caused frequent frame drops.
**Action:** Use `useMemo` to pre-calculate the mapping of `line.id` to an array of path string variables based on `filteredLines`. Wrap the line-rendering helper in a `useMemo` returning a function so that the strings are efficiently reused instead of recalculated on UI interaction.
