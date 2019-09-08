<script>
	export let url;
	export let name;
	export let route;
	export let childRoutes;
	export let level = 1;

	$: marginLeft = (level - 1) * 20;
</script>

<a href={route} style='margin-left: {marginLeft}px'>
	{name}
</a>
<br/>

{#if childRoutes}
	{#each childRoutes as route (route.route)}
		<svelte:self url={url} {...route} level={level + 1}/>
	{/each}
{/if}