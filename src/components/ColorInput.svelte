<script>
	export let id = `color-input-${Math.random() * 100}` // To allow label to reference a unique color input.
	export let label = null
	export let value
</script>

<label for={id}>
	{#if label}{label}{/if}
	<input type="color" {id} bind:value />
</label>

<style>
	label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-inline-end: 1rem;
		margin-inline-start: 1rem;
	}

	input[type='color'] {
		border: none;
		padding: 0;
		margin-inline-start: 1rem;
		height: 4.5rem;
		width: 4.5rem;
		-webkit-appearance: none;
		background-color: transparent;
		justify-self: center;
		cursor: pointer;
		flex-shrink: 0;
	}

	input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	input[type='color']::-webkit-color-swatch {
		border: none;
		border-radius: 50%;
	}
</style>
