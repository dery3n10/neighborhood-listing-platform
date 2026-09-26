# Lab 2 Accessibility and Responsive Test Notes

## Test Date

September 25, 2026

## Responsive Layout Testing

### 375 px

- Result: Passed
- Property cards displayed in one column.
- Sponsor banners stacked vertically.
- Form controls and buttons remained readable and usable.
- No horizontal scrolling, overlap, or cut-off content was observed.

### 768 px

- Result: Passed
- Property cards displayed in two columns.
- Sponsor banners displayed in two columns.
- No horizontal scrolling, overlap, or cut-off content was observed.

### 1280 px

- Result: Passed
- Property cards displayed in three columns.
- Sponsor banners remained organized.
- Spacing remained consistent.
- No horizontal scrolling, overlap, or cut-off content was observed.

## Keyboard Testing

### Tab

- Result: Passed
- Tab moved through the form controls, sponsor links, property links, and Favorite buttons in a logical order.
- Every interactive element displayed a visible focus outline.

### Shift+Tab

- Result: Passed
- Shift+Tab moved backward through the same controls in reverse order.

### Enter and Space

- Result: Passed
- Pressing Enter activated the Apply filters button.
- Pressing Space activated the Favorite button.
- The Favorite button communicated its changed state.
- Pressing Space again returned the button to its original state.

## Form Error Testing

- Result: Passed
- A minimum price greater than the maximum price produced a visible error message.
- The error message was presented through an accessible alert.

## Lighthouse Accessibility Audit

- Tool: Chrome or Edge Lighthouse
- Mode: Desktop
- Category: Accessibility
- Score: 100
- Failed accessibility audits: None

Lighthouse displayed an IndexedDB warning explaining that stored data could affect loading-performance measurements. This was an environment warning and was not an accessibility failure.

## Issues Found

No responsive-layout, keyboard-navigation, form-validation, or Lighthouse accessibility failures were found during this test.

## AI Review and Verified Corrections

### ChatGPT Semantic Review

ChatGPT identified that each property title used an `h2`, even though the cards were inside the `Available properties` section headed by an `h2`. I accepted the recommendation and changed each property title to an `h3` to create the hierarchy `h1` → section `h2` → card `h3`.

### Gemini Accessibility Review

I accepted Gemini's recommendation to replace the light blue focus ring with a darker blue ring and a visible offset. I manually verified the updated focus indicator with keyboard navigation.

I accepted Gemini's toggle-button recommendation with a correction. The visible and accessible name remains `Favorite`, while `aria-pressed` communicates the selected state and a background change gives visual feedback.

I rejected the recommendation to use empty image alternative text because the lab specifically requires purposeful, dynamic alternative text for each property image.

I rejected optional chaining for required numeric fields because the TypeScript `Property` interface requires `price` and `squareFootage` to be numbers. Invalid external data should be validated before it reaches the component.

After the changes, Tab, Enter, and Space testing passed. The final Lighthouse accessibility score remained 100 with no failed audits.