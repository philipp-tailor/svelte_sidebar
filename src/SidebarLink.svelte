<script>
	export let url;
	export let name;
	export let route;
	export let childRoutes;
	export let level = 1;

	$: marginLeft = (level - 1) * 20;
	$: active = url === route;
</script>

<a href={route} style='margin-left: {marginLeft}px' class:active={active}>
	{name}
</a>
<br/>

{#if childRoutes}
	{#each childRoutes as route (route.route)}
		<svelte:self url={url} {...route} level={level + 1}/>
	{/each}
{/if}

<style>
	.active {
		font-weight: bold;
	}
</style>