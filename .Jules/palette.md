## 2026-10-30 - Added ARIA labels to icon-only close buttons
**Learning:** Found a recurring pattern in modal components where close buttons (using only the `X` icon from lucide-react) were lacking accessible names (`aria-label`), making them difficult for screen readers to identify.
**Action:** Always verify that buttons containing only icons and no text have a descriptive `aria-label` added for proper accessibility.
