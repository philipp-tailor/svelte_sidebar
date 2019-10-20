<script>
	import { onMount } from 'svelte'
	import { authenticatedRoutes } from './routes'

	let Sidebar

	onMount(() => {
		loadSidebar()
	})

	async function loadSidebar() {
		const sidebarPath = './Sidebar.js'
		;({ default: Sidebar } = await import(sidebarPath))
	}

	const initialSidebarConfig = Object.freeze({
		activeUrl: '/checkout/confirmation/success',
		routes: authenticatedRoutes,
		open: window.innerWidth > 720,
		onLinkClick: event => alert(`'${event.target.href}' clicked`)
	})

	const getDeepObjectCopy = value => JSON.parse(JSON.stringify(value))

	let sidebarConfig = { ...getDeepObjectCopy(initialSidebarConfig) }

	const getAllRoutes = routes =>
		routes.reduce((allRoutes, route) => {
			return [...allRoutes, route, ...getAllRoutes(route.childRoutes || [])]
		}, [])

	let selectableRoutes
	$: selectableRoutes = getAllRoutes(sidebarConfig.routes)

	const resetSidebarConfig = () => (sidebarConfig = { ...getDeepObjectCopy(initialSidebarConfig) })
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

<svelte:component this={Sidebar} {...sidebarConfig} />
<main class="route-content">
	<select bind:value={sidebarConfig.activeUrl}>
		{#each selectableRoutes as { name, route }}
			<option value={route}>{name}</option>
		{/each}
	</select>

	<textarea
		on:input={e => (sidebarConfig.routes = JSON.parse(e.target.value))}
		value={JSON.stringify(sidebarConfig.routes)} />

	<button on:click={resetSidebarConfig}>reset</button>
</main>
