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
		theme: {
			backgroundColor_linkActive: '#F4442E',
			backgroundColor_nav: '#555B6E',
			color_link: '#F7F7F2',
			color_linkHover: '#FCA311',
			fontSize: '1.2rem',
			maxWidth_nav: '20vw',
			minWidth_nav: '320px',
			opacity_linkDisabled: '0.5',
			opacity_linkInactive: '0.75'
		}
	})

	const getDeepObjectCopy = value => JSON.parse(JSON.stringify(value))

	let sidebarConfig = { ...getDeepObjectCopy(initialSidebarConfig) }

	const getAllRoutes = routes =>
		routes.reduce((allRoutes, route) => {
			return [...allRoutes, route, ...getAllRoutes(route.childRoutes || [])]
		}, [])

	let selectableRoutes
	$: selectableRoutes = getAllRoutes(sidebarConfig.routes)

	const onLinkClick = event => alert(`'${event.target.href}' clicked`)

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

<svelte:component this={Sidebar} {...sidebarConfig} {onLinkClick} />
<main class="route-content">
	<select bind:value={sidebarConfig.activeUrl}>
		{#each selectableRoutes as { name, route }}
			<option value={route}>{name}</option>
		{/each}
	</select>

	<textarea
		on:input={e => (sidebarConfig.routes = JSON.parse(e.target.value))}
		value={JSON.stringify(sidebarConfig.routes)} />

	<input type="color" bind:value={sidebarConfig.theme.backgroundColor_linkActive} />

	<input type="color" bind:value={sidebarConfig.theme.backgroundColor_nav} />

	<input type="color" bind:value={sidebarConfig.theme.color_link} />

	<input type="color" bind:value={sidebarConfig.theme.color_linkHover} />

	<input
		type="range"
		on:input={e => (sidebarConfig.theme.fontSize = `${e.target.value}rem`)}
		value={Number.parseFloat(sidebarConfig.theme.fontSize)}
		min="0.1"
		max="3"
		step="0.1" />

	<input
		type="range"
		on:input={e => (sidebarConfig.theme.maxWidth_nav = `${e.target.value}vw`)}
		value={Number.parseFloat(sidebarConfig.theme.maxWidth_nav)}
		min="5"
		max="100" />

	<input
		type="range"
		on:input={e => {
			sidebarConfig.theme.minWidth_nav = `${e.target.value}px`
			sidebarConfig.open = window.innerWidth > 720 && window.innerWidth / 2 > e.target.value
		}}
		value={Number.parseFloat(sidebarConfig.theme.minWidth_nav)}
		min="5"
		max="1920" />

	<input type="range" bind:value={sidebarConfig.theme.opacity_linkDisabled} min="0.1" max="1" step="0.1" />

	<input type="range" bind:value={sidebarConfig.theme.opacity_linkInactive} min="0.1" max="1" step="0.1" />

	<button on:click={resetSidebarConfig}>reset</button>
</main>
