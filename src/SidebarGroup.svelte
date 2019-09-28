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
	<button class='group-indicator' class:open={groupOpen} on:click={toggleGroup}>> </button>
	<SidebarLink name={name} route={route} />
{/if}

{#if groupOpen}
	<ul>
		{#each routes as route (route.route)}
			<li class:group={route.childRoutes} class:groupActive={activeSubRoute === route.route}>
				{#if route.childRoutes}
					<svelte:self
						routes={route.childRoutes}
						name={route.name}
						route={route.route}
						on:active={handleActiveMessage}
					/>
				{:else}
					<SidebarLink {...route} on:active={handleActiveMessage}/>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		padding-left: 25px;
	}

	.groupActive {
		background-color: white;
	}

	.group {
		margin-bottom: 10px;
	}

	button {
		width: 20px;
	}

	.group-indicator {
		display: inline-block;
	 }

	.group-indicator.open {
		transform: rotate(90deg);
	}
</style>