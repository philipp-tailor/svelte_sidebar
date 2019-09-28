<script>
	import { setContext } from 'svelte';
	import SidebarGroup from './SidebarGroup.svelte';

	export let activeUrl;
	export let routes = [];
	export let onLinkClick = null;

	setContext('sidebarContext', { activeUrl, onLinkClick });
</script>

<nav>
	<SidebarGroup routes={routes} isRoot={true}/>
</nav>

<style>
	nav {
		background-color: #3d3e40;
		height: 100vh;
		min-width: 320px;
		width: max(320px, 25vw);
		box-sizing: border-box;
		z-index: 2;
	}
</style>
