## 2024-11-10 - Memoize complex geo-to-SVG paths
**Learning:** The Astrocartography lines recalculate complex geospatial coordinate transformations to SVG strings on every single frame when panning/zooming, causing frame drops.
**Action:** Pre-calculate and memoize the SVG paths to prevent recalculation.
