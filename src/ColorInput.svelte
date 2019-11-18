<script>
	export let id = `color-input-${Math.random() * 100}`; // to allow label to reference a unique color input
	export let label = null
	export let value
</script>

<style>
	label {
		display: grid;
		grid-template-columns: 2fr 1fr;
		align-items: center;
		box-sizing: border-box;
	}

	input[type='color'] {
		border: none;
		padding: 0;
		margin-left: 1rem;
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

<label for={id}>
	{#if label}
		{label}
	{/if}
	<input type="color" id={id} bind:value={value} />
</label>