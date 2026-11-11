## 2024-10-31 - Missing Input Bounds in Natal Form
**Vulnerability:** The Natal nodal form inputs lacked max lengths for strings and min/max limits for latitude and longitude.
**Learning:** This exposes the app to UI-level Denial of Service risks via extremely long input strings and allows invalid geographical data to be processed and stored.
**Prevention:** Implement HTML-level attributes (`maxLength`, `min`, `max`) and validate/sanitize data bounds prior to submission and storage.
