<script>
	import { createEventDispatcher, onDestroy } from 'svelte'
	import { scale } from 'svelte/transition'
	import { activeUrl } from './SidebarStore'
	import NavigationLink from './NavigationLink.svelte'

	export let routes = []
	export let name = null
	export let route = null
	export let disabled = false

	let groupOpen = true
	let activeSubRoute = null

	const dispatch = createEventDispatcher()

	const toggleGroup = () => (groupOpen = !groupOpen)

	const handleActiveChange = event => {
		groupOpen = true
		activeSubRoute = event.detail.activeSubRoute
		dispatch(event.type, { activeSubRoute: route })
	}

	const unsubscribe = activeUrl.subscribe(value => {
		activeSubRoute = null
	})

	onDestroy(unsubscribe)
</script>

<style>
	.group-toggle {
		display: inline-block;
		width: calc(var(--fontSize) + 5px);
		height: calc(var(--fontSize) + 5px);
		font-size: inherit;
		background-color: transparent;
		color: var(--color_link);
		border: none;
		outline: none;
		cursor: pointer;
	}

	.group-toggle.open {
		transform: rotate(90deg);
	}

	.group-toggle:hover,
	.group-toggle:focus {
		font-weight: bold;
		color: var(--backgroundColor_linkActive);
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		padding-left: calc(var(--fontSize) + 10px);
		line-height: 2.25;
	}

	.group {
		padding-bottom: var(--fontSize);
	}
</style>

{#if name && route}
	{#if !disabled}
		<button
			class="group-toggle"
			class:open={groupOpen}
			on:click={toggleGroup}
			aria-expanded={groupOpen}
			aria-controls={`${route}-group`}
			aria-label="Toggle the visibility of child navigation links"
			title="Toggle the visibility of child navigation links">
			>
		</button>
	{/if}
	<NavigationLink {name} {route} {disabled} activeGroup={activeSubRoute} on:active={handleActiveChange} />
{/if}

<ul id={`${route ? route : 'root'}-group`} hidden={!groupOpen || disabled} in:scale={{ duration: 250 }}>
	{#each routes as route (route.route)}
		<li class:group={route.childRoutes}>
			{#if route.childRoutes}
				<svelte:self
					routes={route.childRoutes}
					name={route.name}
					route={route.route}
					disabled={route.disabled}
					on:active={handleActiveChange} />
			{:else}
				<NavigationLink
					{...route}
					activeGroup={activeSubRoute === route.route}
					on:active={handleActiveChange} />
			{/if}
		</li>
	{/each}
</ul>
