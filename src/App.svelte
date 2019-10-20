<script>
	import { onMount } from 'svelte'
	import { authenticatedRoutes as routes } from './routes'

	let Sidebar

	onMount(() => {
		loadSidebar()
	})

	async function loadSidebar() {
		const sidebarPath = './Sidebar.js'
		;({ default: Sidebar } = await import(sidebarPath))
	}

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

<svelte:component this={Sidebar} {activeUrl} {routes} {onLinkClick} open={window.innerWidth > 720} />
<main class="route-content">
	<select bind:value={activeUrl}>
		{#each selectableRoutes as { name, route }}
			<option value={route}>{name}</option>
		{/each}
	</select>
</main>
