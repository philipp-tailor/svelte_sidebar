<script>
	export let id = `number-input-${Math.random() * 100}` // To allow label to reference a unique number input.
	export let label = null
	export let value
	export let min = 0.1
	export let max = 1
	export let step = 0.1
	export let dark = null
</script>

<label for={id}>
	{#if label}{label}{/if}
	<input {id} type="number" bind:value {min} {max} {step} class:dark />
</label>

<style>
	label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-inline-end: 1rem;
		margin-inline-start: 1rem;
	}

	input[type='number'] {
		margin-inline-start: 1rem;
		flex-shrink: 0;
		height: 4.5rem;
		width: 4.5rem;
		padding: 0.5rem;
		border-radius: 50%;
		text-align: center;
		background-color: var(--light-primary);
		font-size: inherit;
		box-shadow: none;
		outline: none;
		color: inherit;
		border: 2px solid var(--light-primary);
		box-sizing: border-box;
	}

	input[type='number']:focus,
	input[type='number']:active,
	input[type='number']:hover {
		color: var(--light-primary);
		background-color: var(--bg-blue);
	}

	input[type='number'].dark {
		color: var(--dark-primary);
		background-color: var(--light-secondary);
	}

	input[type='number'].dark:focus,
	input[type='number'].dark:active,
	input[type='number'].dark:hover {
		color: var(--dark-primary);
		background-color: var(--accent-orange);
		border: 2px solid var(--accent-orange);
	}
</style>
