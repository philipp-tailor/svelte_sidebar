<script>
	import { afterUpdate, createEventDispatcher } from 'svelte'
	import { activeUrl, onLinkClick } from './SidebarStore'

	export let name
	export let route
	export let disabled = false
	export let activeGroup = false

	let link
	$: active = $activeUrl === route

	const dispatch = createEventDispatcher()

	const scrollIntoView = () =>
		link && link.scrollIntoView({ block: 'end', behavior: 'smooth' })

	const onClick = event => {
		if (disabled) {
			event.preventDefault()
		} else if ($onLinkClick) {
			event.preventDefault()
			$onLinkClick(event)
		}
	}

	afterUpdate(() => {
		if (active) {
			dispatch('active', { activeSubRoute: route })
			setTimeout(scrollIntoView, 250)
		}
	})
</script>

<style>
	a {
		display: inline-block;
		text-decoration: none;
		color: var(--color_link);
		opacity: var(--opacity_linkInactive);
		word-wrap: break-word;
		line-height: 1.3;
		outline: none;
		padding-top: calc(var(--fontSize) / 4);
		padding-bottom: calc(var(--fontSize) / 4);
	}

	a.activeGroup,
	a:hover,
	a[active='true'],
	a:active,
	a:focus {
		opacity: 1;
	}

	a:hover,
	a:focus {
		text-decoration: underline;
		color: var(--color_linkHover);
	}

	a[active='true'],
	a:active {
		background-color: var(--backgroundColor_linkActive);
		margin-left: calc(var(--fontSize) * -0.5);
		padding-right: calc(var(--fontSize) / 2);
		padding-left: calc(var(--fontSize) / 2);
		border-radius: calc(var(--fontSize) / 4);
	}

	a[active='true']:hover,
	a:active:hover,
	a[active='true']:focus,
	a:active:focus {
		background-color: transparent;
	}

	a[disabled='true'] {
		opacity: var(--opacity_linkDisabled);
		cursor: not-allowed;
	}
</style>

<a
	on:click={onClick}
	href={route}
	{active}
	{disabled}
	class:activeGroup
	bind:this={link}
	tabindex="0">
	{name}
</a>
