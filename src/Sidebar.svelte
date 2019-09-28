<script>
	import { setContext } from 'svelte';
	import SidebarGroup from './SidebarGroup.svelte';

	export let activeUrl;
	export let routes = [];

	setContext('sidebarContext', { activeUrl });
</script>

<nav>
	<SidebarGroup routes={routes} isRoot={true}/>
</nav>

<style>
	nav {
		background-color: #3d3e40;
		height: 100vh;
		min-width: 320px;
	}
</style>
