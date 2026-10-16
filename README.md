# Del Monte Kenya Employee Records Management System

This project is a front-end demonstration for a fictional Employee Records Management System inspired by a Kenyan agribusiness organisation, using a Del Monte-inspired green, white, and dark-grey theme.

## Project overview

The application includes six HTML pages:

- `index.html` — Dashboard overview
- `employees.html` — Searchable employee records table
- `add-employee.html` — Employee registration form with validation
- `departments.html` — Department summaries
- `reports.html` — Basic employee stats and department analytics
- `settings.html` — Sample profile and system preferences

Shared files used across the app:

- `styles.css` — shared styling
- `script.js` — search/filter logic, localStorage demo, and form validation
- `assets/del-monte-logo.svg` — placeholder logo based on the provided brand colour palette

## How to open the project

1. Open the project folder in your file manager.
2. Double-click on any HTML file such as `index.html` to open it in a browser.
3. Alternatively, open the folder in a code editor and use a VS Code Live Server extension or any local static server.

Example using Python:

```bash
cd Ephantus-
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Features included

- Responsive sidebar navigation on every page
- Dashboard cards with key HR statistics
- Search and filtering on the employee records page
- Add employee form with browser-side validation
- Sample department summaries and report charts
- Profile and settings screen
- Demo-only storage using `localStorage` in the browser

## Demo-only notes

This is a static front-end prototype only. It is not connected to a real database, MySQL instance, or backend service.

The following features are demonstration-only:

- employee creation does not persist to a server
- data is stored in browser `localStorage` only
- reports and counts are static sample values
- form validation is client-side only

## Folder structure

```text
Ephantus-/
├── assets/
│   └── del-monte-logo.svg
├── index.html
├── employees.html
├── add-employee.html
├── departments.html
├── reports.html
├── settings.html
├── styles.css
├── script.js
├── README.md
```

## Git commands

If the repository is already created and you want to add these files:

```bash
git status
git add .
git commit -m "Add Del Monte Kenya employee records dashboard prototype"
git push origin main
```

If the repository is empty and you need to initialise it first:

```bash
git init
git branch -M main
git remote add origin https://github.com/ephantusi311-creator/Ephantus-.git
git add .
git commit -m "Initial commit: employee records management UI"
git push -u origin main
```

## Assignment note

This is a student assignment interface and should be presented as a front-end prototype rather than an operational HR system connected to a real database.
