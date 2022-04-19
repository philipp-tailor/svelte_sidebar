<script>
	export let id = `textarea-${Math.random() * 100}` // To allow label to reference a unique textarea.
	export let label = null
	export let value
	export let required = true
	export let dark = null
</script>

{#if label}
	<label for={id}>{label}</label>
{/if}
<textarea
	{id}
	bind:value
	{required}
	rows={value.split('\n').length + 3}
	class:dark
/>

<style>
	label {
		display: block;
		margin-block-end: 1rem;
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
		background-color: var(--bg-blue);
		border: 2px solid var(--bg-blue);
	}

	textarea.dark {
		color: var(--light-secondary);
		background-color: var(--dark-primary);
		outline: none;
		border: 2px solid var(--light-secondary);
	}

	textarea.dark:focus,
	textarea.dark:active,
	textarea.dark:hover {
		color: var(--accent-orange);
		background-color: var(--dark-primary);
		border: 2px solid var(--accent-orange);
	}
</style>
