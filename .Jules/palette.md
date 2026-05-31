## 2024-06-01 - Keyboard Accessibility in Custom Search Components
**Learning:** Custom Material-UI TextFields used for search do not inherently support submitting on "Enter" unless wrapped in a `<form>` or explicitly handled via `onKeyDown`. Additionally, `<InputAdornment>` IconButtons often lack ARIA labels, making them inaccessible to screen readers.
**Action:** When implementing custom search inputs, always add `onKeyDown` listeners for the "Enter" key to trigger the search, and ensure the adjacent search icon button has a descriptive `aria-label` like "Search".
