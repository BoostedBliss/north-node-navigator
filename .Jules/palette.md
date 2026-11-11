## 2026-10-30 - Added ARIA labels to icon-only close buttons
**Learning:** Found a recurring pattern in modal components where close buttons (using only the `X` icon from lucide-react) were lacking accessible names (`aria-label`), making them difficult for screen readers to identify.
**Action:** Always verify that buttons containing only icons and no text have a descriptive `aria-label` added for proper accessibility.
## 2025-02-23 - Accessibility of icon-only buttons
**Learning:** Found multiple instances of icon-only buttons (like map zoom, play/pause controls, sound toggles) that relied solely on `title` attributes without `aria-label`. This pattern appears frequently in the app's components, making them inaccessible to screen reader users who rely on the ARIA label for interaction context.
**Action:** Always verify that every icon-only button contains a descriptive `aria-label` along with its `title` to ensure keyboard and screen reader accessibility.
