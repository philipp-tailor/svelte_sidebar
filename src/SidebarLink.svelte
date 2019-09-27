<script>
	export let activeUrl;
	export let name;
	export let route;
	export let childRoutes = null;
	export let level = 1;

	let groupClosed = false;

	$: active = activeUrl === route;
	$: marginLeft = (level - 1) * 40;
	$: groupOpen = childRoutes && !groupClosed;

	const toggleGroup = () => groupClosed = !groupClosed;
</script>

<li class:active={active} style='margin-left: {marginLeft}px'>
	{#if childRoutes}
		<button class='group-indicator' class:open={groupOpen} on:click={toggleGroup}>> </button>
	{/if}

	<a href={route} class:active={active}>
		{name}
	</a>
</li>

{#if groupOpen}
	{#each childRoutes as route (route.route)}
		<svelte:self activeUrl={activeUrl} {...route} level={level + 1}/>
	{/each}
{/if}

<style>
	.active {
		font-weight: bold;
	}

	.group-indicator {
		display: inline-block;
	 }

	.group-indicator.open {
		transform: rotate(90deg);
	}
</style>