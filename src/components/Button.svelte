<script>
	export let onClick
	export let disabled = false
</script>

<button on:click={onClick} {disabled}>
	<slot />
</button>

<style>
	button {
		min-height: 2rem;
		border-radius: 0.5rem;
		color: var(--light-secondary);
		background-color: var(--accent-red);
		border: none;
		box-sizing: border-box;
		cursor: pointer;
		font-size: inherit;
		outline: none;
		padding: 1rem 2rem;
		max-width: 26rem;
		margin-inline-start: auto;
		width: -webkit-fill-available;
		width: -moz-available;
	}

	button::-moz-focus-inner {
		border: 0;
	}

	button:not([disabled]):hover,
	button:not([disabled]):focus {
		color: var(--dark-primary);
		background-color: var(--accent-orange);
	}

	button[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
