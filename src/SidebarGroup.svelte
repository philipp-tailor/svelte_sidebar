<script>
	import { createEventDispatcher } from 'svelte';

	import SidebarLink from './SidebarLink.svelte';

	export let routes = [];
	export let isRoot = false;
	export let name = null;
	export let route = null;

	let groupOpen = true;
	let activeSubRoute = null;

	const dispatch = createEventDispatcher();

	const toggleGroup = () => groupOpen = !groupOpen;

	const handleActiveMessage = (event) => {
		groupOpen = true;
		activeSubRoute = event.detail.activeSubRoute;
		dispatch(event.type, { activeSubRoute: route });
	};
</script>

{#if name && route}
	<button class='group-indicator' class:open={groupOpen} on:click={toggleGroup}>
		>
	</button>
	<SidebarLink name={name} route={route} activeGroup={activeSubRoute} />
{/if}

{#if groupOpen}
	<ul>
		{#each routes as route (route.route)}
			<li class:group={route.childRoutes}>
				{#if route.childRoutes}
					<svelte:self
						routes={route.childRoutes}
						name={route.name}
						route={route.route}
						on:active={handleActiveMessage}
					/>
				{:else}
					<SidebarLink
						{...route}
						on:active={handleActiveMessage}
						activeGroup={activeSubRoute === route.route}
					/>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	.group-indicator {
		display: inline-block;
		width: calc(var(--fontSize) + 5px);
		height: calc(var(--fontSize) + 5px);
		font-size: inherit;
		background-color: transparent;
		color: var(--color_link);
		border: none;
		cursor: pointer;
	 }

	.group-indicator.open {
		transform: rotate(90deg);
	}

	.group-indicator:hover {
		font-weight: bold;
		color: var(--color_linkHover);
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