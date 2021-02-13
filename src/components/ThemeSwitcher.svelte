<script>
	import { onMount } from 'svelte'
	import { isDarkMode } from '../utils/detectDarkMode'

	export let useDarkTheme
	let darkSystemTheme

	onMount(() => {
		darkSystemTheme = isDarkMode
		const useDarkThemePersistedSetting =
			localStorage && localStorage.getItem('useDarkTheme')
		// if the user made a theme choice in the past, re-apply it; otherwise use system settings
		useDarkTheme =
			useDarkThemePersistedSetting !== null &&
			useDarkThemePersistedSetting !== undefined
				? useDarkThemePersistedSetting === 'true'
				: darkSystemTheme
	})

	const toggleTheme = () => {
		useDarkTheme = !useDarkTheme
		localStorage && localStorage.setItem('useDarkTheme', useDarkTheme)
	}
</script>

<div class="theme-switcher" class:dark={useDarkTheme}>
	{#if darkSystemTheme === null}
		Switch theme
	{:else if darkSystemTheme === true}Light theme{:else}Dark theme{/if}
	<label class="switch" for="theme-switcher">
		<input
			id="theme-switcher"
			type="checkbox"
			checked={darkSystemTheme !== useDarkTheme}
			on:click={toggleTheme}
		/>
		<span class="slider" />
	</label>
</div>

<style>
	.theme-switcher {
		user-select: none;
		display: flex;
		align-items: center;
		color: var(--light-secondary);
	}

	/* The switch - the box around the slider */
	.switch {
		margin-left: 0.5rem;
		position: relative;
		display: inline-block;
		width: 2.75rem;
		height: 1.5rem;
		user-select: none;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--bg-white);
		transition: 0.15s;
		border-radius: 1.2rem;
	}

	.slider:hover,
	.slider:focus {
		background-color: var(--accent-orange);
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 1.2rem;
		width: 1.2rem;
		left: 0.2rem;
		bottom: calc((1.5rem - 1.2rem) / 2);
		background-color: var(--bg-blue);
		transition: 0.15s;
		border-radius: 50%;
	}

	.dark .slider:before {
		background-color: var(--dark-primary);
	}

	input:focus + .slider {
		box-shadow: 0 0 2px var(--accent-orange);
	}

	input:checked + .slider:before {
		transform: translateX(calc(2.75rem - 1.2rem - (0.2rem * 2)));
	}
</style>
