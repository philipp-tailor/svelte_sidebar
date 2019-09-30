<script>
	import { authenticatedRoutes as routes } from './routes'
	import Sidebar from './Sidebar.svelte'

	let activeUrl = '/checkout/confirmation/success'

	const onLinkClick = event => alert(`'${event.target.href}' clicked`)

	const getAllRoutes = routes =>
		routes.reduce((allRoutes, route) => {
			return [...allRoutes, route, ...getAllRoutes(route.childRoutes || [])]
		}, [])

	const selectableRoutes = getAllRoutes(routes)
</script>

<style>
	.route-content {
		background-color: #f7f7f2;
		display: grid;
		align-items: center;
		justify-content: center;
	}

	select {
		font-size: 1.2rem;
	}
</style>

<Sidebar {activeUrl} {routes} {onLinkClick} open={window.innerWidth > 720} />
<main class="route-content">
	<select bind:value={activeUrl}>
		{#each selectableRoutes as { name, route }}
			<option value={route}>{name}</option>
		{/each}
	</select>
</main>
