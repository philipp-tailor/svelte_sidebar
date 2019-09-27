<script>
	import SidebarLink from './SidebarLink.svelte';

	export let activeUrl;
	export let routes = [];
</script>

<nav>
	<ul>
		{#each routes as route (route.route)}
			<SidebarLink activeUrl={activeUrl} {...route}/>
		{/each}
	</ul>
</nav>

<style>
	nav {
		background-color: #3d3e40;
		height: 100vh;
		min-width: 320px;
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
</style>
