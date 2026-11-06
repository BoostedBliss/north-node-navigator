## 2026-10-30 - Added ARIA labels to icon-only close buttons
**Learning:** Found a recurring pattern in modal components where close buttons (using only the `X` icon from lucide-react) were lacking accessible names (`aria-label`), making them difficult for screen readers to identify.
**Action:** Always verify that buttons containing only icons and no text have a descriptive `aria-label` added for proper accessibility.
## 2025-02-27 - Associated Form Labels with Inputs in NatalModal
**Learning:** The `NatalModal` form fields lacked proper programmatic association between `<label>` elements and their inputs. This resulted in smaller click targets and a lack of screen reader announcements for the inputs.
**Action:** Always ensure that form `<label>` elements use the `htmlFor` attribute to link to the unique `id` attribute of their respective input/select fields.
