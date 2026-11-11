## 2026-11-09 - Missing ARIA Labels on Icon Buttons
**Learning:** The application's components frequently exhibit an accessibility anti-pattern where icon-only buttons rely solely on `title` attributes instead of `aria-label`s. While `title` provides a tooltip on hover, it does not consistently announce the button's purpose to screen readers across different browsers and assistive technologies.
**Action:** Always standardize and enforce `aria-label` usage when modifying or creating icon-only controls. Do not remove `title`, but ensure `aria-label` is also present for robust accessibility.
