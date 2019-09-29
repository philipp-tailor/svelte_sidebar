# Svelte Sidebar
Sidebar navigation implemented using svelte.

## Features
* Automatically uncollapses the active part of the menu hierarchy and scrolls it into view.
* Reusable component API:
	- `activeUrl`: The current URL.
	- `routes`: A generic application name + path mapping (as laid out in `./src/routes.js`).
	- `onLinkClick`: optional; Allows to customise the action that happens when a navigation link is clicked.
	- `theme`: optional; Allows to customise the most important styles.
	- `open`: optional; Allows to customise whether the navigation bar is open or collapsed by default.
