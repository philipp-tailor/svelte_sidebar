<script>
	import { onMount } from 'svelte'
	import initialSidebarProps from './exampleConfig/sidebarProps'
	import Playground from './pages/playground/Playground.svelte'
	import Readme from './pages/documentation/Readme.svelte'
	import { copyObjectDeep } from './utils/copyObjectDeep'

	let Sidebar

	// Local state containing the active route in the app.
	let pathname = `${window.location.pathname}${window.location.hash}`

	onMount(() => {
		loadSidebar()
	})

	// Load `Sidebar` asynchronously to showcase  that it is a standalone module.
	const loadSidebar = async () => {
		const sidebarPath = './Sidebar.js'
		;({ default: Sidebar } = await import(sidebarPath))
	}

	// Recompute `Sidebar`'s active URL prop whenver there's a route change.
	$: sidebarConfig.activeUrl = pathname

	let sidebarConfig = {
		...copyObjectDeep(initialSidebarProps),
		activeUrl: pathname
	}

	// Triggered when link is clicked in `Sidebar`
	const onLinkClick = event => {
		const { text: pageName, href } = event.target
		// Build relative URL from clicked link's event target href attribute.
		const url = href.replace(window.location.origin, '')
		// Prevent standard navigation.
		event.preventDefault()
		// Push new route to browser history, update local routing state.
		history.pushState(null, `Svelte Sidebar - ${pageName}`, url)
		pathname = url
	}
</script>

<style>
	:global(:root) {
		supported-color-scheme: light dark;
		color-scheme: light dark;

		/* The minimum available width for content (iPhone SE). */
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
		margin: 0;
		font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
			Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		line-height: 1.55;
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

	@media only screen and (max-width: 370px) {
		:global(html) {
			font-size: 16px;
		}
	}

	@media only screen and (min-width: 370px) {
		:global(html) {
			font-size: 19px;
		}
	}
</style>

<!-- Update the routing state when browser navigation occurs. -->
<svelte:window on:popstate={() => (pathname = window.location.pathname)} />

<!--
	Use svelte:component because `Sidebar` is lazy loaded to demonstrate
	that it is truly decoupled from the rest of the app.
-->
<svelte:component this={Sidebar} {...sidebarConfig} {onLinkClick} />

<main class="route-content">
	<!-- Routing: either show readme or playground as main content -->
	{#if pathname && pathname.includes('/readme')}
		<Readme bind:pathname />
	{:else}
		<Playground bind:sidebarConfig />
	{/if}
</main>
