<script>
	import { afterUpdate, createEventDispatcher, getContext } from 'svelte';

	export let name;
	export let route;

	const { activeUrl, onLinkClick } = getContext('sidebarContext');

	$: active = activeUrl === route;

	const dispatch = createEventDispatcher();

	afterUpdate(() => {
		active && dispatch('active', { activeSubRoute: route })
	});

	const onClick = (event) => {
		if (onLinkClick) {
			event.preventDefault();
			onLinkClick(event);
		}
	};
</script>

<a on:click={onClick} href={route} class:active >
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