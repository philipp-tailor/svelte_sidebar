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
	<h2 class="heading">
		Play<wbr />ground
	</h2>
	<div class="playground">
		<div class="form-explainer">
			<div>
				Customise the sidebar on the left with the form below. The props passed to the component can be seen on
				the right. Changes are displayed live.
			</div>
			<button
				on:click={resetSidebarConfig}
				reset form
			</button>
		</div>

		<fieldset>
			<legend>Color</legend>
			<div class="fieldset-container">
				<label for="backgroundColor_nav" class="color-input">
					Back<wbr />ground Color of Sidebar:
					<input type="color" bind:value={sidebarConfig.theme.backgroundColor_nav} id="backgroundColor_nav" />
				</label>

				<label for="backgroundColor_linkActive" class="color-input">
					Back<wbr />ground Color of Active Links:
					<input
						type="color"
						bind:value={sidebarConfig.theme.backgroundColor_linkActive}
						id="backgroundColor_linkActive" />
				</label>

				<label for="color_link" class="color-input">
					Color of Link Text:
					<input type="color" bind:value={sidebarConfig.theme.color_link} id="color_link" />
				</label>

				<label for="color_linkHover" class="color-input">
					Hover Color of Link Text:
					<input type="color" bind:value={sidebarConfig.theme.color_linkHover} id="color_linkHover" />
				</label>
			</div>
		</fieldset>

		<fieldset>
			<legend>Opacity</legend>

			<div class="fieldset-container">
				<label for="opacity_linkDisabled">
					Opacity of Disabled Links:
					<input
						type="number"
						bind:value={sidebarConfig.theme.opacity_linkDisabled}
						min="0.1"
						max="1"
						step="0.1"
						id="opacity_linkDisabled" />
				</label>

				<label for="opacity_linkInactive">
					Opacity of Links Which Are Not Part of the Active Route:
					<input
						type="number"
						bind:value={sidebarConfig.theme.opacity_linkInactive}
						min="0.1"
						max="1"
						step="0.1"
						id="opacity_linkInactive" />
				</label>
			</div>
		</fieldset>

		<fieldset>
			<legend>Sizing</legend>
			<div class="fieldset-container">
				<label for="fontSize">
					Font Size in rem:
					<input
						type="number"
						on:input={e => (sidebarConfig.theme.fontSize = `${e.target.value}rem`)}
						value={Number.parseFloat(sidebarConfig.theme.fontSize)}
						min="0.1"
						max="3"
						step="0.1"
						id="fontSize" />
				</label>

				<label for="maxWidth_nav">
					Sidebar Maximum Width in px:
					<input
						type="number"
						on:input={e => (sidebarConfig.theme.maxWidth_nav = `${(e.target.value / window.innerWidth) * 100}vw`)}
						value={(Number.parseFloat(sidebarConfig.theme.maxWidth_nav) / 100) * window.innerWidth}
						min="10"
						step="50"
						max={window.innerWidth}
						id="maxWidth_nav" />
				</label>

				<label for="minWidth_nav">
					Sidebar Minimum Width in px:
					<input
						type="number"
						on:input={e => {
							sidebarConfig.theme.minWidth_nav = `${e.target.value}px`
							sidebarConfig.open = window.innerWidth > 720 && window.innerWidth / 2 > e.target.value
						}}
						value={Number.parseFloat(sidebarConfig.theme.minWidth_nav)}
						min="0"
						step="50"
						max={window.innerWidth}
						id="minWidth_nav" />
				</label>
			</div>
		</fieldset>

		<fieldset class="content-fieldset">
			<legend>Content</legend>

			<label for="activeUrl">Active URL</label>
			<select bind:value={sidebarConfig.activeUrl} id="activeUrl">
				{#each selectableRoutes as { name, route }}
					<option value={route}>{name}</option>
				{/each}
			</select>

			<label for="routes">Navigation Content</label>
			<textarea
				on:input={e => (sidebarConfig.routes = JSON.parse(e.target.value))}
				value={editableRoutes}
				rows={editableRoutes.split('\n').length + 3}
				required
				id="routes" />
		</fieldset>
	</div>

	<aside>
		<legend>Result</legend>
		<span class="control-character">&lt;</span>
		<span class="html-tag">Sidebar</span>
		{#each Object.entries(sidebarConfig) as prop (prop[0])}
			<p class="component-prop">
				<span>{prop[0]}</span>
				<span class="control-character">="</span>
				<span class="component-prop-value">
					{#if JSON.stringify(prop[1]).split('\n').length > 1}
						<br />
					{/if}
					{JSON.stringify(prop[1], null, 4).replace(/^"|"$/gi, '')}
				</span>
				<span class="control-character">"</span>
			</p>
		{/each}
		<span class="control-character">/&gt;</span>
	</aside>
</main>
