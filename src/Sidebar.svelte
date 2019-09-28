<script>
	import SidebarGroup from './SidebarGroup.svelte';
	import SidebarLink from './SidebarLink.svelte';

	export let activeUrl;
	export let routes = [];
</script>

<nav>
	<SidebarGroup activeUrl={activeUrl} routes={routes} isRoot={true}/>
</nav>

<style>
	nav {
		background-color: #3d3e40;
		height: 100vh;
		min-width: 320px;
	}
</style>
