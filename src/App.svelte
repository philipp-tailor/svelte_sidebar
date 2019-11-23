<script>
	import { onMount } from 'svelte'
	import initialSidebarProps from './exampleConfig/sidebarProps'
	import Playground from './pages/playground/Playground.svelte'
	import { copyObjectDeep } from './utils/copyObjectDeep'

	let Sidebar

	onMount(() => {
		loadSidebar()
	})

	// load `Sidebar` asynchronously to showcase
	// that it is a standalone module
	async function loadSidebar() {
		const sidebarPath = './Sidebar.js'
		;({ default: Sidebar } = await import(sidebarPath))
	}

	let sidebarConfig = { ...copyObjectDeep(initialSidebarProps) }

	const onLinkClick = event => alert(`'${event.target.href}' clicked`)
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

	@media (prefers-color-scheme: dark) {
		.route-content {
			background-color: var(--dark-secondary);
		}
	}
</style>

<!-- using svelte:component is required because `Sidebar` is imported lazily to demonstrate uncoupling from the rest of the app -->
<svelte:component this={Sidebar} {...sidebarConfig} {onLinkClick} />

<main class="route-content">
	<Playground bind:sidebarConfig />
</main>
