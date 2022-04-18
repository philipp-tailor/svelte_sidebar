# Svelte Sidebar
![npm](https://img.shields.io/npm/v/svelte_sidebar)
![NPM](https://img.shields.io/npm/l/svelte_sidebar)
![Bundlephobia](https://badgen.net/bundlephobia/minzip/svelte_sidebar)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e957276f-3f1c-413a-ad78-2b5894f82de9/deploy-status)](https://app.netlify.com/sites/admiring-kare-b5e53d/deploys)
[![Deploy playground to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/philipp-tailor/svelte_sidebar)

Sidebar navigation component written in svelte and compiled to an ES module of 8kb.

Check it out [in the playground](https://sidebar.schneiders.space).

## What it is

This sidebar navigation for web application replicates the experience of browsing the file tree in a code editor. The benefit is that the user can understand the application's information architecture (IA) at first glance, and can quickly jump between different hierarchy levels.
The UI pattern goes well with complex web applications with a lot of nested routes, especially for applications where the user can create data entries (e.g. where multiple users create projects, each of which is composed of multiple screens).

## Features

* Usable in any web-app where the navigation routes are known / computable, as the sidebar is an ES module.
* Semantic, accessible DOM. Navigation is entirely possible with the keyboard. Animations are disabled when `prefers-reduced-motion` is set.
* The navigation hierarchy can be nested as deeply as required. Navigation links with sub-links are collapsible groups.
* Automatically un-collapses the active part of the navigation hierarchy and scrolls it into the viewport. Parent navigation items of the active navigation item are also highlighted compared to inactive navigation items.
* Every navigation link can be disabled.
* Just enough configuration possibilities for re-usability:
	- By default, the regular browser navigation occurs when the user clicks on a link (or presses `Enter`). A function can be passed as property to interrupt the regular navigation to handle navigation on the client side.
	- Themeable: Colors (including hover styles), font sizing, and the minimum and maximum width (depending on the length of the names of navigation links).
* h(n) performance when matching the active route in the navigation hierarchy, where `n` signifies the count of navigation links.

## Installation

* Without installation from [skypack](https://www.skypack.dev/view/svelte_sidebar):

	```js
	import Sidebar from 'https://cdn.skypack.dev/svelte_sidebar'
	```

* Yarn package manager: `yarn add svelte_sidebar`
* NPM package manager: `npm install --save svelte_sidebar`

## Usage

### On any web site / app as ES module

```html
<!-- index.html -->
<div id="app"></div>

<script type="module">
import Sidebar from 'https://cdn.skypack.dev/svelte_sidebar'

  const props = {
    routes: [
		{ "name": "Playground", "route": "/" },
		{ "name": "Readme", "route": "/readme", "childRoutes": [
			{ "name": "What it is", "route": "/readme#what-it-is" }
			]
		}
	],
    activeUrl: '/'
  }

  new Sidebar({target: document.querySelector('#app'), props})
</script>
```

### In a svelte web app

```js
// App.svelte
import Sidebar from 'svelte_sidebar' // or from skypack

const props = {...}

<Sidebar {...props} />
```

## Sidebar component properties

| property name | required | default | description | value type | example value |
| ------------- | -------- | ------- | ----------- | ---------- | ------------- |
| `activeUrl` | no | `null` | The URL that is active in the application. | string | `'https://sidebar.`<wbr>`schneiders.space'`. In a SPA, one would pass the string in from the router, or `window.location.path` |
| `routes` | no | `[]` | This property contains the navigation hierarchy rendered by the sidebar. It's made up from an array of objects mapping URLs to navigation link names and defining the nesting of sub-routes. Not passing values is possible and could e.g. be used while fetching the data required to compute the menu hierarchy. | array, as specified below | see `src/exampleConfig/`<wbr>`routes.js` |
| `onLinkClick` | no | `null` | Function that is executed when the user selects a navigation link. Prevents the regular navigation event. Therefore useful in applications with client side routing. | function receiving the event | `(event) => alert(event.target.href)` |
| `theme` | no | see `defaultTheme` in `src/components/`<wbr>`Sidebar/`<wbr>`Sidebar.svelte` | Allows to customize the most important styles. | object, as described below | `{ backgroundColor_nav: '###ccc' }` |
| `open` | no | true | Allows to customize whether the navigation sidebar is open or horizontally minimized. | boolean | `true`. To collapse the sidebar by default on smaller viewports, the result of an expression like `window.innerWidth < 720px` could be passed. |
| `transitionEnabled` | no | `true` | Whether the route's content will transition in when being displayed. The default is `true`. `False` is less playful, and always used when `prefers-reduced-motion` is enabled. | `boolean` |


[The playground](https://sidebar.schneiders.space) allows to play around with every property. It shows the sidebar on the left, and the component usage on the right. It's therefore the quickest way to find out how to use the component, and to see whether it covers your needs.

### The `routes` array

As specified above, `routes` is an array of navigation route objects. Every one of those objects can have the attributes shown below (others are ignored):

```js
{
	name: 'Products',
	route: '/products',
	disabled: true, /* optional */
	collapseTree: true, /* optional */
	childRoutes: [] /* optional */
}
```

Following the description of a route object's attributes:

| attribute name | required | default | description | value type |
| -------------- | -------- | -------- | ----------- | ---------- |
| ´name´ | yes | - | The name under which the navigation link will be shown in the navigation hierarchy | `string` |
| ´route´ | yes | - | The navigation links' URL | `string` |
| `disabled` | no | `false` | Whether the link is selectable by the user. The default is `false`. `True` can make sense, e.g. if the user is not authorized to access a part of the application. If the route has child routes, the navigation link group can not be uncollapsed by the user. | `boolean` |
| `collapseTree` | no | `false` | Allows to customize whether child routes are shown or vertically collapsed by default. | boolean |
| `childRoutes` | no | `[]` | An array of more route objects. As every route object can have child routes, there's theoretically no limit to the depth of the navigation hierarchy. | `array` |

### The `theme` property

The theme property object takes the following attributes with matching CSS values:

| attribute name | default | description |
| -------------- | ------- | ----------- |
| `backgroundColor_linkActive` | #F4442E | Background color of the active link in the navigation hierarchy. |
| `backgroundColor_nav` | #555B6E | Background color of the whole navigation sidebar. |
| `color_link` | #F7F7F2 | Text color of a navigation link in default state. |
| `color_linkHover` | #FCA311 | Text color of a navigation link when it's hovered upon or focused with the keyboard. |
| `fontSize` | 1.2rem | Font size of navigation links. |
| `maxWidth_nav` | 20vw | The maximum width of the navigation sidebar. Navigation links' name will wrap into multiple lines, if their width in addition to their nesting would surpass `maxWidth_nav`. |
| `minWidth_nav` | 320px | Minimum width of the navigation sidebar. `minWidth_nav` is stronger than `maxWidth_nav`. If min width is larger than max width, min width will define the applied style. |
| `opacity_linkDisabled` | 0.5 | Text opacity of navigation links, that have been specified to be disabled. |
| `opacity_linkInactive` | 0.75 | Text opacity of navigation links that are not part of the navigation hierarchy that contains the active link. |

The property names are CSS custom properties attached to the sidebar element.

## Slots

The sidebar can also be passed children that are placed in pre-defined slots in the sidebar. There's a slot named `header` that is rendered above all navigation links (e.g. for company name and logo), and one below all navigation links called `footer`. On the playground, this slot is used to render the theme switcher.

## License

The code is licensed under MIT, see `LICENSE`.

## Contribution

This code-base is meant to be a one-time effort. I don't plan to extend it, unless there's actual usage and user feedback.

Feel free to report issues, and/or to open PRs. I'll typically respond within a business day.

If you want to contribute, you are welcome to pick one of the open issues.
