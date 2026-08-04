# Accessibility Report

## Implemented checks and improvements

- Semantic `header`, `nav`, `main`, `section`, `article`, `footer`, table, caption, lists, and heading hierarchy are used.
- All reviewed public pages have a single H1.
- The downloader input now has an accessible name and URL input mode.
- Dynamic success/error results are inside an `aria-live="polite"` region.
- Consent choices use native buttons, visible text, a labeled aside, and focus-visible styles.
- Breadcrumbs have an accessible label and current-page indication.
- Capability/support tables use column and row scopes plus a screen-reader caption.
- Content images have meaningful alt text and stable dimensions.
- Icon SVGs are hidden from assistive technology when decorative.
- Details/summary FAQs are keyboard-operable native controls and their content is visible to crawlers/users.
- Public navigation remains available without a JavaScript-controlled mobile menu.

## Remaining manual tests

1. Keyboard-only: tab order, visible focus, form validation, details toggles, consent actions, language switcher, preview downloads.
2. Screen readers: VoiceOver/Safari and NVDA/Chrome for input errors, loading, result announcements, and navigation landmarks.
3. 200% and 400% zoom at 320 CSS-pixel width; confirm no clipped text or controls.
4. Contrast measurement for all text, focus rings, disabled/loading buttons, and error states.
5. Reduced motion: confirm progress and decorative animations respect preferences.
6. Touch targets on header navigation and carousel result controls.

## Browser smoke result

At a 390 × 844 viewport, the rendered document width matched the viewport (no horizontal overflow), the H1 and primary input/button remained within bounds, the URL input exposed its accessible name, and invalid submission set `aria-invalid="true"` while rendering the localized validation message. Browser console and page-error logs were empty. This complements rather than replaces assistive-technology testing.

## Known risk

Ant Design supplies form and alert behavior, so accessibility should be rechecked after library upgrades. Dynamic third-party media previews use generated alt text (“Instagram media N”) because source descriptions are not reliably available; the adjacent provider/type context should remain visible.

## Acceptance criteria

- No keyboard trap.
- Every control has a programmatic name and clear focus state.
- Errors are announced and connected to the relevant field.
- Page remains usable at 400% zoom and in forced-colors/high-contrast modes.
- Automated axe/Lighthouse checks show no critical violations, followed by manual screen-reader verification.
