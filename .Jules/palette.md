## 2026-10-30 - Added ARIA labels to icon-only close buttons
**Learning:** Found a recurring pattern in modal components where close buttons (using only the `X` icon from lucide-react) were lacking accessible names (`aria-label`), making them difficult for screen readers to identify.
**Action:** Always verify that buttons containing only icons and no text have a descriptive `aria-label` added for proper accessibility.
## 2025-02-27 - Icon-only buttons lacking ARIA labels
**Learning:** Found multiple instances where interactive, icon-only buttons relied entirely on the `title` attribute for accessibility.
**Action:** Consistently add `aria-label` along with `title` for icon-only interactive elements to ensure clear screen reader announcements.
