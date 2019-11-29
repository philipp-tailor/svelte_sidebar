import { writable } from 'svelte/store'

/*
 * The store allows to avoid passing `activeUrl` and `onLinkClick`
 * as prop to every `NavigationLinkGroup` & `NavigationLink`.
 */

export const activeUrl = writable(null)

export const onLinkClick = writable(null)
