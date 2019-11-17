<script>
	export let id = `textarea-${Math.random() * 100}` // to allow label to reference a unique textarea
	export let label = null;
	export let value
	export let required = true
</script>

<style>
	label {
		display: block;
		margin-bottom: 1rem;
	}

	textarea {
		padding: 2rem;
		width: calc(100% - 4rem - 4px);
		border-radius: 0.5rem;
		font-size: 1rem;
		line-height: 1rem;
		outline: none;
		border: 2px solid var(--light-primary);
		background-color: var(--light-primary);
	}

	textarea:active,
	textarea:focus,
	textarea:hover {
		color: var(--light-primary);
		background-color: var(--bg-blue-primary);
		border: 2px solid var(--bg-blue-primary);
	}

	textarea {
		color: var(--light-secondary);
		background-color: var(--dark-primary);
		outline: none;
		border: 2px solid var(--light-secondary);
	}

	textarea:focus,
	textarea:active,
	textarea:hover {
		color: var(--accent-orange);
		background-color: var(--dark-primary);
		border: 2px solid var(--accent-orange);
	}
</style>

{#if label}
	<label for={id}>{label}</label>
{/if}
<textarea {id} bind:value {required} rows={value.split('\n').length + 3} />
