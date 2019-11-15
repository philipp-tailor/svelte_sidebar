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
			backgroundColor_nav: isDarkMode ? '#1E1E1E' : '#003649',
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

	let editableRoutes
	$: editableRoutes = JSON.stringify(sidebarConfig.routes, null, 4)

	const onLinkClick = event => alert(`'${event.target.href}' clicked`)

	const resetSidebarConfig = () => (sidebarConfig = { ...getDeepObjectCopy(initialSidebarConfig) })
</script>

<style>
	.route-content {
		background-color: var(--light-primary);
		overflow-y: auto;
		padding: 0 1rem;
		display: flex;
		flex-wrap: wrap;
		flex-basis: 10rem;
		flex-grow: 1;
		flex-shrink: 2;
	}

	.heading {
		flex-basis: 100%;
		position: sticky;
		top: 0;
		margin: 1rem;
		background-color: var(--light-primary);
		font-size: 3rem;
		font-weight: bold;
		text-transform: uppercase;
		word-break: break-word;
		z-index: 10;
	}

	.playground {
		flex-basis: 60%;
		flex-grow: 2;
		min-width: var(--min-available-width);
		box-sizing: border-box;
		padding: 1rem;
	}

	.form-explainer {
		display: grid;
		align-items: start;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		grid-gap: 2rem;
	}

	button {
		min-height: 2rem;
		border-radius: 0.5rem;
		color: var(--light-secondary);
		background-color: var(--accent-red);
		border: none;
		box-sizing: border-box;
		cursor: pointer;
		font-size: inherit;
		outline: none;
		padding: 1rem 2rem;
		max-width: 26rem;
		margin-left: auto;
		width: -webkit-fill-available;
		width: -moz-available;
	}

	button::-moz-focus-inner {
		border: 0;
	}

	button:not([disabled]):hover,
	button:not([disabled]):focus {
		color: var(--dark-primary);
		background-color: var(--accent-orange);
	}

	button[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}

	fieldset {
		background-color: var(--bg-white);
		margin-top: 2rem;
		padding: 2rem 1rem;
		border: none;
		border-radius: 0.5rem;
	}

	legend {
		font-size: 1.5rem;
		font-weight: bold;
		text-transform: uppercase;
	}

	.fieldset-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
		grid-gap: 2rem;
	}

	.fieldset-container label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 1rem;
		margin-left: 1rem;
	}

	.color-input {
		display: grid;
		grid-template-columns: 2fr 1fr;
		align-items: center;
		box-sizing: border-box;
	}

	input[type='color'] {
		border: none;
		padding: 0;
		margin-left: 1rem;
		height: 4.5rem;
		width: 4.5rem;
		-webkit-appearance: none;
		background-color: transparent;
		justify-self: center;
		cursor: pointer;
		flex-shrink: 0;
	}

	input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	input[type='color']::-webkit-color-swatch {
		border: none;
		border-radius: 50%;
	}

	input[type='number'] {
		margin-left: 1rem;
		flex-shrink: 0;
		height: 4.5rem;
		width: 4.5rem;
		padding: 0.5rem;
		border-radius: 50%;
		text-align: center;
		background-color: var(--light-primary);
		font-size: inherit;
		box-shadow: none;
		outline: none;
		color: inherit;
		border: 2px solid var(--light-primary);
		box-sizing: border-box;
	}

	input[type='number']:focus,
	input[type='number']:active,
	input[type='number']:hover {
		color: var(--light-primary);
		background-color: var(--bg-blue-primary);
	}

	.content-fieldset {
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.content-fieldset label {
		display: block;
		margin-bottom: 1rem;
	}

	select {
		font-size: 1rem;
		height: fit-content;
		margin-bottom: 2rem;
		width: 100%;
		border-radius: 0.5rem;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		padding: 1rem 1.5rem;
		border: 2px solid var(--light-primary);
		background-color: var(--light-primary);
		color: var(--dark-primary);
		outline: none;
		cursor: pointer;
	}

	select:-moz-focusring,
	select::-moz-focus-inner {
		color: transparent;
		text-shadow: 0 0 0 var(--dark-primary);
	}

	select:active,
	select:focus,
	select:hover {
		color: var(--light-primary);
		background-color: var(--bg-blue-primary);
		border: 2px solid var(--bg-blue-primary);
	}

	textarea {
		padding: 2rem;
		width: calc(100% - 4rem - 4px);
		border-radius: 0.5rem;
		font-size: 1rem;
		line-height: 1rem;
		outline: none;
		border: 2px solid var(--light-primary);
		background-color: var(--light-primary);
	}

	textarea:active,
	textarea:focus,
	textarea:hover {
		color: var(--light-primary);
		background-color: var(--bg-blue-primary);
		border: 2px solid var(--bg-blue-primary);
	}

	aside {
		color: var(--light-secondary);
		background-color: var(--bg-blue-primary);
		padding: 2rem;
		margin: 1rem;
		border-radius: 0.5rem;
		word-break: break-word;
		height: fit-content;
		height: -moz-fit-content;
		flex-basis: 30%;
		flex-shrink: 1;
		flex-grow: 1;
		box-sizing: border-box;
	}

	aside legend {
		color: var(--dark-primary);
		margin-top: -4rem;
		margin-bottom: 2.1rem;
	}

	.html-tag {
		color: var(--bg-white);
		margin-left: 1rem;
	}

	.control-character {
		color: var(--light-primary);
		margin-right: -1rem;
	}

	.component-prop {
		color: var(--accent-red);
		margin-left: 1rem;
		margin-top: 0;
		margin-bottom: 0;
		opacity: 0.95;
	}

	.component-prop-value {
		display: inline-block;
		color: var(--accent-orange);
		padding-left: 2rem;
		text-indent: -1rem;
		opacity: 0.95;
	}

	@media (prefers-color-scheme: dark) {
		.route-content {
			background-color: var(--dark-secondary);
		}

		.heading {
			background-color: var(--dark-secondary);
		}

		fieldset {
			background-color: var(--dark-primary);
		}

		input[type='number'] {
			color: var(--dark-primary);
			background-color: var(--light-secondary);
		}

		input[type='number']:focus,
		input[type='number']:active,
		input[type='number']:hover {
			color: var(--dark-primary);
			background-color: var(--accent-orange);
			border: 2px solid var(--accent-orange);
		}

		select {
			color: var(--light-secondary);
			border: 2px solid var(--light-secondary);
			background-color: var(--dark-primary);
			outline: none;
		}

		select:focus,
		select:active,
		select:hover {
			color: var(--accent-orange);
			background-color: var(--dark-primary);
			border: 2px solid var(--accent-orange);
		}

		select:-moz-focusring,
		select::-moz-focus-inner {
			color: transparent;
			text-shadow: 0 0 0 var(--dark-primary);
		}

		textarea {
			color: var(--light-secondary);
			background-color: var(--dark-primary);
			outline: none;
			border: 2px solid var(--light-secondary);
		}

		textarea:focus,
		textarea:active,
		textarea:hover {
			color: var(--accent-orange);
			background-color: var(--dark-primary);
			border: 2px solid var(--accent-orange);
		}

		aside {
			background-color: var(--dark-primary);
		}

		aside legend {
			margin-top: -2.9rem;
			margin-bottom: 1.1rem;
			color: var(--light-secondary);
		}
	}

	@media (max-width: 440px) {
		.playground {
			padding-bottom: 0;
		}

		aside {
			position: unset;
			margin-top: 2rem;
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
				disabled={JSON.stringify(sidebarConfig) === JSON.stringify(initialSidebarConfig)}>
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
