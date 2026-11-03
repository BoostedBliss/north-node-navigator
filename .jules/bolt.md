## 2026-03-14 - Redundant astronomy calculations in components
**Learning:** Found redundant or potentially expensive calls to `calculateLunarNodes` in loops (e.g., `NodalLifespanGraph` runs it for age 0 to 90 every time).
**Action:** Can memoize or optimize loop calculations, though it might be tricky since they depend on different `pointDate` each iteration. In `generateAstrocartographyLines`, there is some point generation that could be optimized but might be needed. Let's look closely at `NodalLifespanGraph`.

## 2026-03-14 - Fast bounding-box rejection in geospatial loops
**Learning:** O(n²) spatial comparisons (e.g. mapping points against global lines) can be drastically sped up without quad-trees by employing early-reject conditions based solely on 1D delta thresholds (like `latitude` difference) compared to the current `minDistance`.
**Action:** Always check if a quick 1D or bounding-box heuristic can short-circuit complex math like the Haversine formula in heavy spatial nested loops.
