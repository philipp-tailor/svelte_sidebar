<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { scale } from 'svelte/transition';
	import { activeUrl } from './SidebarStore';
	import SidebarLink from './SidebarLink.svelte';

	export let routes = [];
	export let isRoot = false;
	export let name = null;
	export let route = null;

	let groupOpen = true;
	let activeSubRoute = null;

	const dispatch = createEventDispatcher();

	const toggleGroup = () => groupOpen = !groupOpen;

	const handleActiveChange = (event) => {
		groupOpen = true;
		activeSubRoute = event.detail.activeSubRoute;
		dispatch(event.type, { activeSubRoute: route });
	};

	const unsubscribe = activeUrl.subscribe(value => {
		activeSubRoute = null;
	});

	onDestroy(unsubscribe);
</script>

{#if name && route}
	<button
		class='group-toggle'
		class:open={groupOpen}
		on:click={toggleGroup}
		aria-expanded={groupOpen}
		aria-controls={`${route}-group`}
		aria-label='Toggle the visibility of child navigation links'
		title='Toggle the visibility of child navigation links'
	>
		>
	</button>
	<SidebarLink
		name={name}
		route={route}
		activeGroup={activeSubRoute}
		on:active={handleActiveChange}
	/>
{/if}

<ul id={`${route}-group`} hidden={!groupOpen} in:scale={{duration: 200}}>
	{#each routes as route (route.route)}
		<li class:group={route.childRoutes}>
			{#if route.childRoutes}
				<svelte:self
					routes={route.childRoutes}
					name={route.name}
					route={route.route}
					on:active={handleActiveChange}
				/>
			{:else}
				<SidebarLink
					{...route}
					activeGroup={activeSubRoute === route.route}
					on:active={handleActiveChange}
				/>
			{/if}
		</li>
	{/each}
</ul>

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

	.group-toggle:hover, .group-toggle:focus {
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