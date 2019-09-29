<script>
	import { afterUpdate, createEventDispatcher, getContext } from 'svelte';

	export let name;
	export let route;
	export let activeGroup = false;

	let link;

	const { activeUrl, onLinkClick } = getContext('sidebarContext');

	$: active = activeUrl === route;

	const dispatch = createEventDispatcher();

	afterUpdate(() => {
		if (active) {
			dispatch('active', { activeSubRoute: route })
			setTimeout(
				() => link.scrollIntoView({block: 'end', behavior: 'smooth'}),
				250
			)
		}
	});

	const onClick = (event) => {
		if (onLinkClick) {
			event.preventDefault();
			onLinkClick(event);
		}
	};
</script>

<a on:click={onClick} href={route} {active} class:activeGroup bind:this={link}>
	{name}
</a>

<style>
	a {
		display: inline-block;
		text-decoration: none;
		color: var(--color_link);
		opacity: 0.7;
		word-wrap: break-word;
		line-height: 1.3;
		text-indent: calc(var(--fontSize) * -1);
		margin-left: var(--fontSize);
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