<script>
	import { beforeUpdate } from 'svelte'
	import {
		activeUrl as storeActiveUrl,
		onLinkClick as storeOnLinkClick,
		transitionEnabled as storeTransitionEnabled,
	} from './SidebarStore'
	import NavigationLinkGroup from './NavigationLinkGroup.svelte'

	const defaultTheme = {
		backgroundColor_linkActive: '#F4442E',
		backgroundColor_nav: '#555B6E',
		color_link: '#F7F7F2',
		color_linkHover: '#FCA311',
		fontSize: '1.2rem',
		maxWidth_nav: '20vw',
		minWidth_nav: '320px',
		opacity_linkDisabled: '0.5',
		opacity_linkInactive: '0.75',
	}

	export let activeUrl = null
	export let routes = []
	export let onLinkClick = null
	export let theme = {}
	export let open = true
	export let transitionEnabled = true
	export let collapseTree = false

	// Initialise the shared store with the values passed to `Sidebar` as props.
	beforeUpdate(() => {
		storeActiveUrl.set(activeUrl)
		storeOnLinkClick.set(onLinkClick)
		storeTransitionEnabled.set(
			transitionEnabled &&
				!window.matchMedia('(prefers-reduced-motion: reduce)').matches
		)
	})

	$: combinedTheme = { ...defaultTheme, ...theme }
	// Not using custom property style directive, because compilation results in superfluous wrapper div, see:
	// https://svelte.dev/docs#template-syntax-component-directives---style-props
	$: styleString = [
		`--backgroundColor_linkActive: ${combinedTheme.backgroundColor_linkActive}`,
		`--backgroundColor_nav: ${combinedTheme.backgroundColor_nav}`,
		`--color_link: ${combinedTheme.color_link}`,
		`--color_linkHover: ${combinedTheme.color_linkHover}`,
		`--fontSize: ${combinedTheme.fontSize}`,
		`--maxWidth_nav: ${combinedTheme.maxWidth_nav}`,
		`--minWidth_nav: ${combinedTheme.minWidth_nav}`,
		`--opacity_linkDisabled: ${combinedTheme.opacity_linkDisabled}`,
		`--opacity_linkInactive: ${combinedTheme.opacity_linkInactive}`,
	].join('; ')

	const toggleOpen = () => (open = !open)
</script>

<nav id="svelte-sidebar" class:open style={styleString}>
	<slot name="header" />
	<button
		class="sidebar-toggle"
		class:open
		on:click={toggleOpen}
		aria-expanded={open}
		aria-controls="svelte-sidebar"
		title="Toggle the navigation sidebar"
		aria-label="Toggle the navigation sidebar"
	>
		>
	</button>
	{#if open}
		<NavigationLinkGroup {routes} {collapseTree} />
		<slot name="footer" />
	{/if}
</nav>

<style>
	nav {
		height: 100vh;
		position: relative;
		box-sizing: border-box;
		overflow-y: auto;
		z-index: 2;
		padding-block-start: calc(var(--fontSize) + 10px);
		padding-inline-end: calc(var(--fontSize) * 2 + 10px);
		padding-block-end: calc(var(--fontSize) + 10px);
		padding-inline-start: calc(var(--fontSize));
		background-color: var(--backgroundColor_nav);
		font-size: var(--fontSize);
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
	}

	nav.open {
		min-width: var(--minWidth_nav);
		max-width: var(--maxWidth_nav);
	}

	nav:not(.open) {
		max-width: 3rem;
	}

	.sidebar-toggle {
		position: absolute;
		top: calc(var(--fontSize) + 5px);
		right: calc(var(--fontSize) + 5px);
		display: inline-block;
		width: calc(var(--fontSize) + 5px);
		height: calc(var(--fontSize) + 5px);
		font-size: inherit;
		background-color: transparent;
		color: var(--color_link);
		border: none;
		outline: none;
		cursor: pointer;
	}

	.sidebar-toggle::-moz-focus-inner {
		border: 0;
	}

	.sidebar-toggle.open {
		transform: rotate(180deg);
	}

	.sidebar-toggle:hover,
	.sidebar-toggle:focus {
		font-weight: bold;
		color: var(--backgroundColor_linkActive);
	}
</style>
