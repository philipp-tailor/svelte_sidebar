# Svelte Sidebar

<!-- TODO: 1 GIF OF SIDEBAR IN ACTION -->
<!-- TODO: NETIFLY DEPLOY BADGE -->
<!-- TODO: APPLICATION UP-To-DATE BADGE -->
<!-- TODO: DEPLOY WITH NETIFLY BUTTON -->
<!-- TODO: BUNDLE ANALYSIS -->

Sidebar navigation component written in svelte and compiled to an ES module of 8kb.

Check it out [in the playground](https://sidebar.schneiders.space).

## What it is

This sidebar navigation for web application replicates the experience of browsing the file tree in a code editor. The benefit is that the user can understand the application's information achitecture (IA) at first glance, and can quickly jump between different hierarchy levels.
The UI pattern goes well with complex web applications with a lot of nested routes, especially for applications where the user can create data entries (e.g. where multiple users create projects, each of which is composed of multiple screens).

## Features

* Usable in any web-app where the navigation routes are known / computable, as the sidebar is an ES module.
* Semantic, accessible DOM. Navigation is entirely possible with the keyboard.
* The navigation hierarchy can be nested as deeply as required. Navigation links with sub-links are collapsible groups.
* Automatically un-collapses the active part of the navigation hierarchy and scrolls it into the viewport. Parent navigation items of the active navigation item are also highlighted compared to inactive navigation items.
* Every navigation link can be disabled.
* Just enough configuration possibilities for re-usability:
	- By default, the regular browser navigation occors when the user clicks on a link (or presses `Enter`). A function can be passed as property to interrupt the regular navigation to handle navigation on the client side.
	- Themable: Colors (including hover styles), font sizing, and the minimum and maximum width (depending on the length of the names of navigation links).
* h(n) performance when matching the active route in the navigation hierarchy, where `n` signifies the count of navigation links.

## Component properties

| property name | required | default | description | value type | example value |
| ------------- | -------- | ------- | ----------- | ---------- | ------------- |
| `activeUrl` | no | `null` | The URL that is active in the application. | string | `'https://sidebar.`<wbr>`schneiders.space'`. In a SPA, one would pass the string in from the router, or `window.location.path` |
| `routes` | no | `[]` | This property contains the navigation hierarchy rendered by the sidebar. It's made up from an array of objects mapping URLs to navigation link names and defining the nesting of sub-routes. Not passing values is possible and could e.g. be used while fetching the data required to compute the menu hierarchy. | array, as specified below | see `src/exampleConfig/`<wbr>`routes.js` |
| `onLinkClick` | no | `null` | Function that is executed when the user selects a navigation link. Prevents the regular navigation event. Therefore useful in applications with client side routing. | function receiving the event | `(event) => alert(event.target.href)` |
| `theme` | no | see `defaultTheme` in `src/components/`<wbr>`Sidebar/`<wbr>`Sidebar.svelte` | Allows to customize the most important styles. | object, as described below | `{ backgroundColor_nav: '###ccc' }` |
| `open` | no | true | Allows to customize whether the navigation bar is open or collapsed. | boolean | `true`. To collapse the sidebar by default on smaller viewports, the result of an expression like `window.innerWidth < 720px` could be passed |

[The playground](https://sidebar.schneiders.space) allows to play around with every property. It shows the sidebar on the left, and the component usage on the right. It's therefore the quickest way to find out how to use the component, and to see whether it covers your needs.

### The `routes` array

As specified above, `routes` is an array of navigation route objects. Every one of those objects can have the attributes shown below (others are ignored):

```js
{
	name: 'Products',
	route: '/products',
	disabled: true, /* optional */
	childRoutes: [] /* optional */
}
```

Following the description of a route object's attributes:

| attribute name | required | description | value type |
| -------------- | -------- | ----------- | ---------- |
| name | yes | The name under which the navigation link will be shown in the navigation hierarchy | `string` |
| route | yes | The navigation links's URL | `string` |
| disabled | no | Whether the link is selectable by the user. The default is `false`. `True` can make sense, e.g. if the user is not authorized to access a part of the application. If the route has child routes, the navigation link group can not be uncollapsed by the user. | `boolean` |
| childRoutes | no | An array of more route objects. As every route object can have child routes, there's theoretically no limit to the depth of the navigation hierarchy. | `array` |

### The `theme` property

The theme property object takes the following attributes with matching CSS values:

| attribute name | default | description |
| -------------- | ------- | ----------- |
| `backgroundColor_linkActive` | #F4442E | Background color of the active link in the navigation hierarchy. |
| `backgroundColor_nav` | #555B6E | Background color of the whole navigation sidebar. |
| `color_link` | #F7F7F2 | Text color of a navigation link in default state. |
| `color_linkHover` | #FCA311 | Text color of a navigation link when it's hovered upon or focused with the keyboard. |
| `fontSize` | 1.2rem | Font size of navigation links. |
| `maxWidth_nav` | 20vw | The maximum width of the navigation sidebar. Navigation links's name will wrap into multiple lines, if their width in addition to their nesting would surpass `maxWidth_nav`. |
| `minWidth_nav` | 320px | Minimum width of the navigation sidebar. `minWidth_nav` is stronger than `maxWidth_nav`. If min width is larger than max width, min width will define the applied style. |
| `opacity_linkDisabled` | 0.5 | Text opacity of navigation links, that have been specified to be disabled. |
| `opacity_linkInactive` | 0.75 | Text opacity of navigation links that are not part of the navigation hierarchy that contains the active link. |

The property names are CSS custom properties attached to the sidebar element.

## License

The code is licensed under MIT, see `LICENSE`.

## Contribution

This code-base is meant to be a one-time effort. I don't plan to extend it, unless there's actual usage and user feedback.

Feel free to report issues, and/or to open PRs. I'll typically respond within a business day.

If you want to contribute, you are welcome to pick one of the open issues.
