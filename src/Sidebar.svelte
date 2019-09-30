<script>
	import { beforeUpdate } from 'svelte';
	import { activeUrl as storeActiveUrl, onLinkClick as storeOnLinkClick } from './SidebarStore';
	import SidebarGroup from './SidebarGroup.svelte';

	const defaultTheme = {
		color_link: '#F7F7F2',
		color_linkActive: '#F4442E',
		color_linkHover: '#FCA311',
		opacity_linkInactive: '0.75',
		opacity_linkDisabled: '0.5',
		backgroundColor_nav: '#555B6E',
		fontSize: '1.2rem',
		minWidth_nav: '320px',
		maxWidth_nav: '20vh',
	};

	export let activeUrl;
	export let routes = [];
	export let onLinkClick = null;
	export let theme = {};
	export let open = true;

	beforeUpdate(() => {
		storeActiveUrl.set(activeUrl);
		storeOnLinkClick.set(onLinkClick);
	});

	$: combinedTheme = { ...defaultTheme, ...theme };
	$: styleString = [
			`--color_link: ${combinedTheme.color_link}`,
			`--color_linkActive: ${combinedTheme.color_linkActive}`,
			`--color_linkHover: ${combinedTheme.color_linkHover}`,
			`--backgroundColor_nav: ${combinedTheme.backgroundColor_nav}`,
			`--fontSize: ${combinedTheme.fontSize}`,
			`--minWidth_nav: ${combinedTheme.minWidth_nav}`,
			`--maxWidth_nav: ${combinedTheme.maxWidth_nav}`,
			`--opacity_linkInactive: ${combinedTheme.opacity_linkInactive}`,
			`--opacity_linkDisabled: ${combinedTheme.opacity_linkDisabled}`,
		].join('; ');

	const toggleOpen = () => open = !open;
</script>

<nav id='svelte-sidebar' class:open style={styleString}>
	<button
		class='sidebar-toggle'
		class:open
		on:click={toggleOpen}
		aria-expanded={open}
		aria-controls='svelte-sidebar'
		title='Toggle the navigation sidebar'
		aria-label='Toggle the navigation sidebar'
	>
		>
	</button>
	{#if open}
		<SidebarGroup routes={routes}/>
	{/if}
</nav>

<style>
	nav {
		height: 100vh;
		position: relative;
		box-sizing: border-box;
		overflow-y: auto;
		z-index: 2;
		padding-top: calc(var(--fontSize) + 10px);
		padding-right: calc(var(--fontSize) * 2 + 10px);
		padding-bottom: calc(var(--fontSize) + 10px);
		padding-left: calc(var(--fontSize));
		background-color: var(--backgroundColor_nav);
		box-shadow: calc(var(--fontSize) / 10) 0 var(--fontSize) 0 var(--backgroundColor_nav);
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

	.sidebar-toggle.open {
		transform: rotate(180deg);
	}

	.sidebar-toggle:hover, .sidebar-toggle:focus {
		font-weight: bold;
		color: var(--color_linkHover);
	}
</style>
