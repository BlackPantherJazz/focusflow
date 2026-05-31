A productivity web app designed for people with ADHD.
Built with HTML, CSS, and JavaScript.

## How to Run
- Clone or download the repository
- Open `index.html` in any browser
- No installations or servers required

## Features
- Pomodoro focus timer with Low / Medium / High energy modes
- Visual progress bar and color-coded countdown
- Brain Dump section to capture distracting thoughts
- Task Breakdown — split big tasks into small steps
- XP reward system for completing tasks and sessions
- Data saved to localStorage — persists on page refresh

## Javascript Concepts Used
- DOM selection with `getElementById` and `querySelector`
- Creating and appending elements with `createElement` and `appendChild`
- `DocumentFragment` and `cloneNode` for efficient rendering
- Event listeners — `click`, `keydown`, and `input` events
- Form validation — HTML attributes and JS event-driven validation
- BOM features — `window.setInterval`, `window.setTimeout`, `window.localStorage`, `window.confirm`
- CSS class manipulation with `classList`
- Parent/child DOM navigation with `parentNode` and `closest`

## Known Issues/ Notes
- Brain Dump items are not saved to localStorage on refresh (items are session-only)
- Tasks are cleared on refresh — localStorage saving is partially implemented

## Author
Built by Henoc Montes 