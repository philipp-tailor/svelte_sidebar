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

	const getDeepObjectCopy = value => JSON.parse(JSON.stringify(value))

	const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

	const initialSidebarConfig = Object.freeze({
		activeUrl: '/checkout/confirmation/success',
		routes: authenticatedRoutes,
		open: window.innerWidth > 720,
		theme: {
			backgroundColor_linkActive: '#F4442E',
			backgroundColor_nav: isDarkMode ? '#000000' : '#003649',
			color_link: '#F7F7F2',
			color_linkHover: '#FCA311',
			fontSize: '1.2rem',
			maxWidth_nav: '20vw',
			minWidth_nav: '320px',
			opacity_linkDisabled: '0.5',
			opacity_linkInactive: '0.75'
		}
	})

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
	:root {
		supported-color-scheme: light dark;
		color-scheme: light dark;
	}

	.route-content {
		background-color: #f7f7f2;
		display: grid;
		align-items: center;
		justify-content: center;
		overflow-y: auto;
	}

	select {
		font-size: 1.2rem;
	}

	@media (prefers-color-scheme: dark) {
		.route-content {
			background-color: #555b6e;
		}
	}
</style>

<svelte:component this={Sidebar} {...sidebarConfig} {onLinkClick} />
<main class="route-content">
	<label for="activeUrl">Active URL</label>
	<select bind:value={sidebarConfig.activeUrl} id="activeUrl">
		{#each selectableRoutes as { name, route }}
			<option value={route}>{name}</option>
		{/each}
	</select>

	<label for="routes">Navigation Content</label>
	<textarea
		on:input={e => (sidebarConfig.routes = JSON.parse(e.target.value))}
		value={JSON.stringify(sidebarConfig.routes)}
		id="routes" />

	<fieldset>
		<legend>Colors</legend>

		<label for="backgroundColor_nav">Background Color of Sidebar:</label>
		<input
			type="color"
			bind:value={sidebarConfig.theme.backgroundColor_nav}
			id="backgroundColor_nav"
			tabindex="0" />
		{sidebarConfig.theme.backgroundColor_nav}
		<br />

		<label for="backgroundColor_linkActive">Background Color of Active Links:</label>
		<input
			type="color"
			bind:value={sidebarConfig.theme.backgroundColor_linkActive}
			id="backgroundColor_linkActive" />
		{sidebarConfig.theme.backgroundColor_linkActive}
		<br />

		<label for="color_link">Color of Link Text:</label>
		<input type="color" bind:value={sidebarConfig.theme.color_link} id="color_link" />
		{sidebarConfig.theme.color_link}
		<br />

		<label for="color_linkHover">Hover Color of Link Text:</label>
		<input type="color" bind:value={sidebarConfig.theme.color_linkHover} id="color_linkHover" />
		{sidebarConfig.theme.color_linkHover}
	</fieldset>

	<fieldset>
		<legend>Opacity</legend>

		<label for="opacity_linkDisabled">Opacity of Disabled Links:</label>
		<input
			type="range"
			bind:value={sidebarConfig.theme.opacity_linkDisabled}
			min="0.1"
			max="1"
			step="0.1"
			id="opacity_linkDisabled" />
		{sidebarConfig.theme.opacity_linkDisabled}
		<br />

		<label for="opacity_linkInactive">Opacity of Links Which Are Not Part of the Active Route:</label>
		<input
			type="range"
			bind:value={sidebarConfig.theme.opacity_linkInactive}
			min="0.1"
			max="1"
			step="0.1"
			id="opacity_linkInactive" />
		{sidebarConfig.theme.opacity_linkInactive}
	</fieldset>

	<fieldset>
		<legend>Sizes</legend>

		<label for="fontSize">Font Size:</label>
		<input
			type="range"
			on:input={e => (sidebarConfig.theme.fontSize = `${e.target.value}rem`)}
			value={Number.parseFloat(sidebarConfig.theme.fontSize)}
			min="0.1"
			max="3"
			step="0.1"
			id="fontSize" />
		{sidebarConfig.theme.fontSize}
		<br />

		<label for="maxWidth_nav">Sidebar Max Width:</label>
		<input
			type="range"
			on:input={e => (sidebarConfig.theme.maxWidth_nav = `${e.target.value}vw`)}
			value={Number.parseFloat(sidebarConfig.theme.maxWidth_nav)}
			min="5"
			max="100"
			id="maxWidth_nav" />
		{sidebarConfig.theme.maxWidth_nav}
		<br />

		<label for="minWidth_nav">Sidebar Min Width:</label>
		<input
			type="range"
			on:input={e => {
				sidebarConfig.theme.minWidth_nav = `${e.target.value}px`
				sidebarConfig.open = window.innerWidth > 720 && window.innerWidth / 2 > e.target.value
			}}
			value={Number.parseFloat(sidebarConfig.theme.minWidth_nav)}
			min="5"
			max="1920"
			id="minWidth_nav" />
		{sidebarConfig.theme.minWidth_nav}
		<br />
	</fieldset>

	<button on:click={resetSidebarConfig}>reset</button>
</main>
