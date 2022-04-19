<script>
	import { isDarkMode } from '../utils/detectDarkMode'

	const THEMES = { dark: 'dark', light: 'light' }
	let isSystemThemeDark = false
	let initalTheme
	let currentTheme
	export let useDarkTheme

	$: {
		isSystemThemeDark = isDarkMode
		initalTheme =
			localStorage.theme ||
			(isSystemThemeDark ? THEMES.dark : THEMES.light)
		currentTheme = initalTheme
		useDarkTheme = currentTheme === THEMES.dark
	}

	const toggleTheme = () => {
		currentTheme = currentTheme === THEMES.dark ? THEMES.light : THEMES.dark
		if (localStorage) localStorage.theme = currentTheme
	}
</script>

<div class="theme-switcher" class:dark={useDarkTheme}>
	{initalTheme} theme
	<label class="switch" for="theme-switcher">
		<input
			id="theme-switcher"
			type="checkbox"
			aria-label={`Enable ${initalTheme} theme`}
			checked={currentTheme === initalTheme}
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
		margin-inline-start: 0.5rem;
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
