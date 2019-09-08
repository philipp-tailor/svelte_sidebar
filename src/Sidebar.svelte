<script>
	import SidebarLink from './SidebarLink.svelte';

	export let url;
	export let routes = [];
</script>

<nav class="sidebar">
	<ul>
		{#each routes as route (route.route)}
			<SidebarLink url={url} {...route}/>
		{/each}
	</ul>
</nav>

<style>
	.sidebar {
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