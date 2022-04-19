<script>
	import SidebarCodePreview from './SidebarCodePreview.svelte'
	import Button from '../../components/Button.svelte'
	import ColorInput from '../../components/ColorInput.svelte'
	import NumericInput from '../../components/NumericInput.svelte'
	import Textarea from '../../components/Textarea.svelte'
	import initialSidebarProps from '../../exampleConfig/sidebarProps'
	import { areObjectsEqual } from '../../utils/compareObjects'
	import { copyObjectDeep } from '../../utils/copyObjectDeep'
	import { prettyPrintJson } from '../../utils/prettyPrintJson'

	export let sidebarConfig
	export let dark

	let width

	// Button to trigger `resetSidebarConfig` is disabled when there's nothing to reset.
	let isConfigUnchanged = false
	$: isConfigUnchanged = areObjectsEqual(sidebarConfig, initialSidebarProps)

	/*
	 * Contains the mutable configuration rendered on the playground below.
	 * Counterintuitive: it's not possible to declare the let directly
	 * from `initialSidebarProps`.
	 */
	let playgroundConfig
	$: playgroundConfig = {
		fontSize: parseFloat(initialSidebarProps.theme.fontSize),
		maxWidth:
			(parseFloat(initialSidebarProps.theme.maxWidth_nav) / 100) *
			window.innerWidth,
		minWidth: parseFloat(initialSidebarProps.theme.minWidth_nav),
		routesFormatted: prettyPrintJson(initialSidebarProps.routes),
	}

	/*
	 * Reactively translate the playground input to the format required by the
	 * respective `Sidebar` property.
	 */
	$: {
		// Close sidebar when the viewport is too small.
		sidebarConfig.open =
			width > 950 && width / 3 > playgroundConfig.minWidth

		// Translate numeric inputs to numeric values with unit.
		sidebarConfig.theme.fontSize = `${playgroundConfig.fontSize}rem`
		sidebarConfig.theme.maxWidth_nav = `${
			(playgroundConfig.maxWidth / width) * 100
		}vw`
		sidebarConfig.theme.minWidth_nav = `${playgroundConfig.minWidth}px`

		// Parse input from textarea back to JSON (and skip on failure).
		try {
			const parsedRoutes = JSON.parse(playgroundConfig.routesFormatted)
			sidebarConfig.routes = parsedRoutes
		} catch (e) {}
	}

	const resetSidebarConfig = () =>
		(sidebarConfig = { ...copyObjectDeep(initialSidebarProps) })
</script>

<svelte:window bind:innerWidth={width} />

<h2 class="heading">Playground</h2>
<div class="playground" class:dark>
	<div class="form-explainer">
		<div>
			Customise the sidebar on the left with the form below. The props
			passed to the component can be seen on the right. Changes are
			displayed live.
		</div>
		<Button onClick={resetSidebarConfig} disabled={!isConfigUnchanged}>
			reset form
		</Button>
	</div>

	<fieldset>
		<legend>Color</legend>

		<!--
			Nesting a div inside a fieldset is only required because Chrome
			hasn't added support for flexbox & grid to this element for years,
			see: https://bugs.chromium.org/p/chromium/issues/detail?id=375693
		-->
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
				{dark}
				bind:value={sidebarConfig.theme.opacity_linkDisabled}
			/>

			<NumericInput
				label="Opacity of Links Which Are Not Part of the Active Route:"
				{dark}
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
				{dark}
				max="3"
			/>

			<NumericInput
				label="Sidebar Maximum Width in px:"
				bind:value={playgroundConfig.maxWidth}
				min="10"
				step="50"
				{dark}
				max={width}
			/>

			<NumericInput
				label="Sidebar Minimum Width in px:"
				bind:value={playgroundConfig.minWidth}
				min="0"
				step="50"
				{dark}
				max={width}
			/>
		</div>
	</fieldset>

	<fieldset class="content-fieldset">
		<legend>Routes</legend>

		<Textarea
			label="Navigation Structure"
			bind:value={playgroundConfig.routesFormatted}
			{dark}
			required
		/>
	</fieldset>
</div>

<SidebarCodePreview {sidebarConfig} {dark} />

<style>
	.heading {
		flex-basis: 100%;
		margin: 1rem;
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

	fieldset {
		background-color: var(--bg-white);
		margin-block-start: 2rem;
		padding: 2rem 1rem;
		border: none;
		border-radius: 0.5rem;
	}

	.dark fieldset {
		background-color: var(--dark-primary);
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
		margin-block-end: 1rem;
	}

	@media (max-width: 440px) {
		.playground {
			padding-block-end: 0;
		}
	}
</style>
