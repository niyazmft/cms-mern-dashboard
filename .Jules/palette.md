## 2024-06-01 - DataGrid Custom Toolbar Accessibility and Interaction
**Learning:** In Material-UI DataGrid custom toolbars, standard TextFields used for search often lack `onKeyDown` handlers for the Enter key, making keyboard-only navigation frustrating. Additionally, the adjacent search icon button often lacks an `aria-label`, hindering screen reader users.
**Action:** When implementing custom search inputs, always explicitly add `onKeyDown` listeners for the 'Enter' key and ensure adjacent icon-only buttons have descriptive `aria-label` attributes for screen reader accessibility.
