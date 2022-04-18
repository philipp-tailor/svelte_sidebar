import { writable, derived } from 'svelte/store'

/*
 * The store allows to avoid unnecessary prop-drilling.
 */

export const activeUrl = writable(null)

export const onLinkClick = writable(null)

export const transitionEnabled = writable(true)

export const transitionDurationInMs = derived(
	transitionEnabled,
	($transitionEnabled) => ($transitionEnabled ? 250 : 0)
)
