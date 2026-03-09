# AGENTS.md

## Start-of-task behavior

At the beginning of every task:
- check the Git status
- identify whether the repository is clean or dirty
- warn the user if there are existing staged, unstaged, or untracked files
- do not assume ownership of existing modifications


## Project Overview

This repository contains a modern web calculator built with:

- HTML5
- Tailwind CSS v4 via CLI
- Vanilla JavaScript
- `localStorage` for calculation history persistence

The application includes:

- basic arithmetic operations
- decimal support
- parentheses
- keyboard support
- persistent history with timestamps
- neumorphic UI styling
- dark/light mode implementation

## Project Structure

```text
calculator2/
|-- index.html
|-- sources/
|   |-- css/
|   |   |-- styles.css
|   |   |-- output.css
|   |   `-- tailwind.css
|   `-- js/
|       `-- script.js
|-- LICENSE
|-- README.md
`-- AGENTS.md
```

## Key Files

- `index.html`: main application markup
- `sources/js/script.js`: calculator logic, keyboard support, theme toggle, and history handling
- `sources/css/tailwind.css`: Tailwind v4 source file and inline Tailwind directives
- `sources/css/output.css`: generated CSS output
- `sources/css/styles.css`: small custom CSS additions

## Tech And Coding Expectations

- Use vanilla JavaScript only
- Do not introduce frameworks or build systems unless explicitly requested
- Keep the project simple and browser-friendly
- Preserve responsive behavior
- Preserve calculation history behavior using `localStorage`
- Keep UI consistent with the existing neumorphic design direction
- Prefer small, targeted changes over large rewrites
- Avoid unnecessary dependencies

## UI And Styling Rules

- Tailwind CSS is used through the Tailwind CLI
- The project uses Tailwind CSS v4
- Tailwind sources and variants are declared in `sources/css/tailwind.css`
- For UI-related changes, prefer editing:
  - `index.html`
  - `sources/css/tailwind.css`
  - `sources/css/styles.css`
- Only touch generated CSS output when strictly necessary
- Do not manually maintain large blocks inside `sources/css/output.css`
- Any UI change should preserve responsiveness across desktop and mobile
- Preserve the current dark mode approach based on the `.dark` class on the root element

## Tailwind Notes

The project no longer uses `tailwind.config.js`.

Tailwind v4 is configured directly in `sources/css/tailwind.css` with directives such as:

- `@source` to tell Tailwind which files to scan for class names
- `@custom-variant dark (&:is(.dark *));` to support `dark:` classes using a `.dark` parent
- `@import "tailwindcss";` to load Tailwind

## CSS Build Commands

Use one of these commands depending on the task:

Development watch mode:

```bash
tailwindcss -i "sources/css/tailwind.css" -o "sources/css/output.css" -w
```

One-off minified build:

```bash
tailwindcss -i "sources/css/tailwind.css" -o "sources/css/output.css" -m
```

## Important Note About CSS Rebuilds

- Run the Tailwind build command only when UI or styling files are modified
- If only JavaScript logic changes, a CSS rebuild is not required
- Ensure `sources/css/output.css` reflects the latest UI changes before finishing work

## Working Guidelines For The Agent

When editing this project:

1. First determine whether the requested change is:
   - UI/styling
   - calculator logic
   - history behavior
   - keyboard interaction
   - bug fix
   - small refactor

2. Prefer minimal and safe edits:
   - keep the existing file structure
   - avoid renaming files unless necessary
   - avoid breaking current browser compatibility

3. After UI changes:
   - rebuild Tailwind CSS using one of the provided CLI commands
   - verify class names and layout still work correctly
   - do not reintroduce the Tailwind CDN script in `index.html`

4. After JavaScript changes:
   - ensure calculator operations still work
   - ensure history still saves correctly
   - ensure keyboard input still behaves correctly
   - ensure invalid input is handled gracefully
   - preserve theme toggle behavior

## Functional Expectations

The calculator should continue to support:

- numbers `0-9`
- decimal input
- operators `+`, `-`, `*`, `/`
- parentheses `(` and `)`
- Enter to evaluate
- Backspace to delete
- clearing the current calculation
- persistent history with timestamps
- dark/light mode toggling

## Safety Rules

- Do not remove history support unless explicitly requested
- Do not replace vanilla JavaScript with a framework
- Do not change project structure unnecessarily
- Do not break `localStorage` persistence
- Do not introduce server-side requirements for this static project

## Definition Of Done

A task is complete when:

- the requested change is implemented
- no existing calculator core feature is broken
- the UI remains responsive and visually coherent
- Tailwind CSS has been rebuilt if the UI was modified
- generated CSS output is up to date when applicable


## Git safety rules

Before making any Git action, always inspect the working tree first.

- Run a status check before starting work.
- If there are existing uncommitted changes, do not assume they belong to the current task.
- Never include pre-existing uncommitted changes in a commit unless explicitly instructed.
- Never create a new branch without explicit user approval.
- Never commit without explicit user approval.
- Never push without explicit user approval.
- Never open or prepare a pull request without explicit user approval.

If the repository already contains local modifications:
1. Report them clearly.
2. Separate your own changes from pre-existing ones.
3. Ask whether your changes should be committed alone or together with earlier changes.

When finishing a task:
- summarize modified files
- explain whether the repo was already dirty before your work
- propose a branch name, commit message, and PR description, but do not execute Git publication steps without approval