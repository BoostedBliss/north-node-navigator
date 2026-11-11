## 2024-05-17 - Missing ARIA Labels on Map Zoom Controls
**Learning:** In interactive map components like AstroMap, custom icon buttons often use `title` attributes for tooltips but lack `aria-label`s and proper `focus-visible` styles, leading to poor screen reader and keyboard navigation experiences.
**Action:** Always add `aria-label` along with `title` for icon-only buttons, and ensure proper focus styling using classes like `focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none rounded` is applied.
