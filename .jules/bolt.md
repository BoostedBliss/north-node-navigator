## 2023-11-09 - Memoizing static SVG rendering
**Learning:** `renderContinents` in `AstroMap.tsx` calculates SVG paths from coordinates on every render. Because the `CONTINENT_POLYGONS` coordinates never change and the conversion function `geoToSvgCoords` relies only on coordinates and fixed sizes, this produces the same result on every re-render (e.g. on every mouse drag or hover, or when date changes).
**Action:** Use `useMemo` to memoize the static continent paths. They should only be recalculated if something relevant changes (which never happens for `CONTINENT_POLYGONS`).

## 2023-11-09 - Memoizing dynamic line paths and scatter coordinates
**Learning:** Calculating SVG path strings via `geoToSvgCoords` for extensive geospatial lines or scattered locations directly inside the component's render loop severely degrades performance during simple operations like panning or hovering, because it calculates every data point on every frame, even though the source geometries haven't changed.
**Action:** Extract geo-to-SVG transformations and path generation into `useMemo` hooks before the returned layout, retrieving precomputed path data inside render loops to ensure smooth 60fps responsiveness during state changes like mouse interactions.
