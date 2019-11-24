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
	:global(:root) {
		supported-color-scheme: light dark;
		color-scheme: light dark;

		/* the minimum ever available width for content (iPhone SE) */
		--min-available-width: 240px;

		--dark-primary: #1e1e1e;
		--dark-secondary: #555b6e;
		--light-primary: #eaeef1;
		--light-secondary: #f7f7f2;
		--bg-white: white;
		--bg-blue-primary: #003649;
		--accent-red: #f4442e;
		--accent-orange: #fca311;

		color: var(--dark-primary);
	}

	:global(body) {
		display: flex;
		height: 100vh;
		margin: 0;
		font-family: sans-serif;
	}

	:global(#svelte-sidebar) {
		flex-grow: 5;
		flex-shrink: 1;
		flex-basis: 320px;
	}

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
		:global(:root) {
			color: var(--light-secondary);
		}

		.route-content {
			background-color: var(--dark-secondary);
		}
	}

	@media only screen and (max-width: 380px) {
		:global(html) {
			font-size: 13px;
		}
	}

	@media only screen and (min-width: 380px) {
		:global(html) {
			font-size: 16px;
		}
	}
</style>

<!-- using svelte:component is required because `Sidebar` is imported lazily to demonstrate uncoupling from the rest of the app -->
<svelte:component this={Sidebar} {...sidebarConfig} {onLinkClick} />

<main class="route-content">
	<Playground bind:sidebarConfig />
</main>
