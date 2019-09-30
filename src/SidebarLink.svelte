<script>
	import { afterUpdate, createEventDispatcher } from 'svelte';
	import { activeUrl, onLinkClick } from './SidebarStore';

	export let name;
	export let route;
	export let disabled = false;
	export let activeGroup = false;

	let link;
	$: active = $activeUrl === route;

	const dispatch = createEventDispatcher();

	const scrollIntoView = () => link.scrollIntoView({block: 'end', behavior: 'smooth'});

	const onClick = (event) => {
		if (disabled) {
			event.preventDefault();
		}
		else if ($onLinkClick) {
			event.preventDefault();
			$onLinkClick(event);
		}
	};

	afterUpdate(() => {
		if (active) {
			dispatch('active', { activeSubRoute: route });
			setTimeout(scrollIntoView, 250);
		}
	});
</script>

<a
	on:click={onClick}
	href={route}
	{active}
	{disabled}
	class:activeGroup
	bind:this={link}
	tabindex='0'
>
	{name}
</a>

<style>
	a {
		display: inline-block;
		text-decoration: none;
		color: var(--color_link);
		opacity: var(--opacity_linkInactive);
		word-wrap: break-word;
		line-height: 1.3;
		text-indent: calc(var(--fontSize) * -1);
		margin-left: var(--fontSize);
		outline: none;
	}

	a.activeGroup, a:hover, a[active='true'], a:active, a:focus {
		opacity: 1;
	}

	a:hover, a:focus {
		text-decoration: underline;
		color: var(--color_linkHover);
	}

	a[active='true'], a:active {
		font-weight: bold;
		color: var(--color_linkActive);
	}

	a[disabled='true'] {
		opacity: var(--opacity_linkDisabled);
		cursor: not-allowed;
	}
</style>