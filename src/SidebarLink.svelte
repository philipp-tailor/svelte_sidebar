<script>
	import { afterUpdate, createEventDispatcher } from 'svelte';

	export let activeUrl;
	export let name;
	export let route;

	$: active = activeUrl === route;

	const dispatch = createEventDispatcher();

	afterUpdate(() => {
		active && dispatch('active', { activeSubRoute: route })
	});
</script>

<a href={route} class:active >
	{name}
</a>

<style>
	a {
		line-height: 1.5;
	}

	.active {
		font-weight: bold;
		color: black;
	}
</style>