## 2026-10-30 - Added ARIA labels to icon-only close buttons
**Learning:** Found a recurring pattern in modal components where close buttons (using only the `X` icon from lucide-react) were lacking accessible names (`aria-label`), making them difficult for screen readers to identify.
**Action:** Always verify that buttons containing only icons and no text have a descriptive `aria-label` added for proper accessibility.
## 2026-10-31 - Focus and ARIA on Interactive Elements
**Learning:** Icon-only interactive elements lacking focus states and ARIA labels represent a systemic accessibility gap across various views (maps, alerts, timelines).
**Action:** Ensure all interactive elements, particularly icon-only buttons, have distinct `focus-visible` styles and accurate `aria-label` attributes for comprehensive keyboard and screen reader accessibility.
