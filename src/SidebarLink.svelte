<script>
	import { afterUpdate, createEventDispatcher, getContext } from 'svelte';

	export let name;
	export let route;
	export let activeGroup = false;

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

<a on:click={onClick} href={route} {active} class:activeGroup>
	{name}
</a>

<style>
	a {
		text-decoration: none;
		color: var(--color_link);
		opacity: 0.7;
		word-wrap: break-word;
	}

	a.activeGroup, a:hover, a[active='true'], a:active {
		opacity: 1;
	}

	a:hover {
		text-decoration: underline;
		color: var(--color_linkHover);
	}

	a[active='true'], a:active {
		font-weight: bold;
		color: var(--color_linkActive);
	}
</style>