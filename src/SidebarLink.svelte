<script>
	import { afterUpdate, createEventDispatcher, getContext } from 'svelte';

	export let name;
	export let route;

	const { activeUrl } = getContext('sidebarContext');

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