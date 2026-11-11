## 2023-11-09 - Memoizing static SVG rendering
**Learning:** `renderContinents` in `AstroMap.tsx` calculates SVG paths from coordinates on every render. Because the `CONTINENT_POLYGONS` coordinates never change and the conversion function `geoToSvgCoords` relies only on coordinates and fixed sizes, this produces the same result on every re-render (e.g. on every mouse drag or hover, or when date changes).
**Action:** Use `useMemo` to memoize the static continent paths. They should only be recalculated if something relevant changes (which never happens for `CONTINENT_POLYGONS`).

## 2024-03-24 - SVG Path Pre-calculation for Heavy Geodata
**Learning:** During highly interactive SVG manipulation (like panning/zooming via state), calculating geographic coords to screen paths inside the render function of thousands of points (`renderLinePath`) causes major frame drops. React's diffing algorithm can't save us from the CPU cost of the initial string computation.
**Action:** When a static or semi-static array of complex coordinates (`lines`) changes, process the heavy data transformation into raw SVG path strings *once* in a `useMemo` map keyed by the entity ID, rather than in the render loop.
