<script>
	export let id = `select-${Math.random() * 100}` // To allow label to reference a unique select.
	export let label = null
	export let value = null
	export let options // In the format `[{name, value}]`.
</script>

<style>
	label {
		display: block;
		margin-bottom: 1rem;
	}

	select {
		font-size: 1rem;
		height: fit-content;
		margin-bottom: 2rem;
		width: 100%;
		border-radius: 0.5rem;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		padding: 1rem 1.5rem;
		border: 2px solid var(--light-primary);
		background-color: var(--light-primary);
		color: var(--dark-primary);
		outline: none;
		cursor: pointer;
	}

	select:-moz-focusring,
	select::-moz-focus-inner {
		color: transparent;
		text-shadow: 0 0 0 var(--dark-primary);
	}

	select:active,
	select:focus,
	select:hover {
		color: var(--light-primary);
		background-color: var(--bg-blue-primary);
		border: 2px solid var(--bg-blue-primary);
	}

	@media (prefers-color-scheme: dark) {
		select {
			color: var(--light-secondary);
			border: 2px solid var(--light-secondary);
			background-color: var(--dark-primary);
			outline: none;
		}

		select:focus,
		select:active,
		select:hover {
			color: var(--accent-orange);
			background-color: var(--dark-primary);
			border: 2px solid var(--accent-orange);
		}

		select:-moz-focusring,
		select::-moz-focus-inner {
			color: transparent;
			text-shadow: 0 0 0 var(--dark-primary);
		}
	}
</style>

{#if label}
	<label for={id}>{label}</label>
{/if}
<select bind:value {id}>
	{#each options as { name, value }}
		<option {value}>{name}</option>
	{/each}
</select>
