## 2026-11-03 - Utility Buttons Missing ARIA Labels
**Learning:** Found a pattern where utility icon-only buttons (like sound toggles, close buttons, zoom controls) often use `title` attributes but omit `aria-label`s, which reduces screen reader accessibility.
**Action:** When adding or reviewing utility icon buttons across the application, ensure both `aria-label` (for screen readers) and `title` (for mouse hover tooltips) are consistently provided.
