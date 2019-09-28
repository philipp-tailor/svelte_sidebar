<script>
	import { setContext } from 'svelte';
	import SidebarGroup from './SidebarGroup.svelte';

	const defaultTheme = {
		color_link: '#F7F7F2',
		color_linkActive: '#F4442E',
		color_linkHover: '#FCA311',
		backgroundColor_nav: '#555B6E',
		fontSize: '1.2rem',
	};

	export let activeUrl;
	export let routes = [];
	export let onLinkClick = null;
	export let theme = {};

	setContext('sidebarContext', { activeUrl, onLinkClick });

	$: combinedTheme = { ...defaultTheme, ...theme };
	$: styleString = [
			`--color_link: ${combinedTheme.color_link}`,
			`--color_linkActive: ${combinedTheme.color_linkActive}`,
			`--color_linkHover: ${combinedTheme.color_linkHover}`,
			`--backgroundColor_nav: ${combinedTheme.backgroundColor_nav}`,
			`--fontSize: ${combinedTheme.fontSize}`,
		].join('; ');
</script>

<nav style={styleString}>
	<SidebarGroup routes={routes} isRoot={true}/>
</nav>

<style>
	nav {
		height: 100vh;
		min-width: 320px;
		width: max(320px, 20vw);
		box-sizing: border-box;
		overflow-y: auto;
		z-index: 2;
		padding: calc(var(--fontSize) + 10px);
		padding-right: calc(var(--fontSize) * 2 + 10px);
		background-color: var(--backgroundColor_nav);
		box-shadow: calc(var(--fontSize) / 10) 0 var(--fontSize) 0 var(--backgroundColor_nav);
		font-size: var(--fontSize);
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
	}
</style>
