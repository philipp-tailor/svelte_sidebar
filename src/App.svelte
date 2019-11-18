<script>
	import { onMount } from 'svelte'
	import { authenticatedRoutes } from './routes'
	import ColorInput from './ColorInput.svelte'
	import NumericInput from './NumericInput.svelte'
	import Select from './Select.svelte'
	import Textarea from './Textarea.svelte'

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
		routes.reduce(
			(allRoutes, route) => [
				...allRoutes,
				{ name: route.name, value: route.route },
				...getAllRoutes(route.childRoutes || [])
			],
			[]
		)

	let playgroundConfig;
	
	$: playgroundConfig = {
		fontSize: parseFloat(initialSidebarConfig.theme.fontSize),
		maxWidth: (parseFloat(initialSidebarConfig.theme.maxWidth_nav) / 100) * window.innerWidth,
		minWidth: parseFloat(initialSidebarConfig.theme.minWidth_nav),
		routeList: getAllRoutes(initialSidebarConfig.routes),
		routesFormatted: JSON.stringify(initialSidebarConfig.routes, null, 4),
	};

	// reactively translate the playground input to the format
	// required by the respective `Sidebar` prop
	$: {
		// close sidebar when the viewport is too small
		sidebarConfig.open = window.innerWidth > 720 && window.innerWidth / 2 > playgroundConfig.minWidth

		// translate numeric inputs to numeric values with unit
		sidebarConfig.theme.fontSize = `${playgroundConfig.fontSize}rem`
		sidebarConfig.theme.maxWidth_nav = `${(playgroundConfig.maxWidth / window.innerWidth) * 100}vw`
		sidebarConfig.theme.minWidth_nav = `${playgroundConfig.minWidth}px`

		// parse input from textarea back to JSON (and skip on failure)
		try {
			const parsedRoutes = JSON.parse(playgroundConfig.routeStringFormatted)
			sidebarConfig.routes = parsedRoutes
		} catch (e) {}
	}

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

	.content-fieldset {
		padding: 2rem;
		margin-bottom: 2rem;
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

<!-- using svelte:component is required because `Sidebar` is imported lazily to demonstrate uncoupling from the rest of the app -->
<svelte:component this={Sidebar} {...sidebarConfig} {onLinkClick} />

<main class="route-content">
	<h2 class="heading">
		<!-- prettier-ignore-start -->
		Play<wbr />ground
		<!-- prettier-ignore-end -->
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
				<ColorInput
					label="Background Color of Sidebar:"
					bind:value={sidebarConfig.theme.backgroundColor_nav}
				/>

				<ColorInput
					label="Background Color of Active Links:"
					bind:value={sidebarConfig.theme.backgroundColor_linkActive}
				/>

				<ColorInput
					label="Color of Link Text:"
					bind:value={sidebarConfig.theme.color_link}
				/>

				<ColorInput
					label="Hover Color of Link Text:"
					bind:value={sidebarConfig.theme.color_linkHover}
				/>
			</div>
		</fieldset>

		<fieldset>
			<legend>Opacity</legend>

			<div class="fieldset-container">
				<NumericInput
					label="Opacity of Disabled Links:"
					bind:value={sidebarConfig.theme.opacity_linkDisabled}
				/>

				<NumericInput
					label="Opacity of Links Which Are Not Part of the Active Route:"
					bind:value={sidebarConfig.theme.opacity_linkInactive}
				/>
			</div>
		</fieldset>

		<fieldset>
			<legend>Sizing</legend>
			<div class="fieldset-container">
				<NumericInput
					label="Font Size in rem:"
					bind:value={playgroundConfig.fontSize}
					max=3
				/>

				<NumericInput
					label="Sidebar Maximum Width in px:"
					bind:value={playgroundConfig.maxWidth}
					min=10
					step=50
					max={window.innerWidth}
				/>

				<NumericInput
					label="Sidebar Minimum Width in px:"
					bind:value={playgroundConfig.minWidth}
					min=0
					step=50
					max={window.innerWidth}
				/>
			</div>
		</fieldset>

		<fieldset class="content-fieldset">
			<legend>Content</legend>

			<Select label="Active URL" options={playgroundConfig.routeList} bind:value={sidebarConfig.activeUrl} />

			<Textarea label="Navigation Content" bind:value={playgroundConfig.routesFormatted} required />
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
