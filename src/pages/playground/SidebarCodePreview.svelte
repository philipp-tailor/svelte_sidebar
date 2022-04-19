<script>
	export let sidebarConfig
	export let dark = null
</script>

<aside class:dark>
	<legend>Result</legend>
	<span class="control-character">&lt;</span>
	<span class="html-tag">Sidebar</span>
	{#each Object.entries(sidebarConfig) as prop (prop[0])}
		<p class="component-prop">
			<span>{prop[0]}</span>
			<span class="control-character">="</span>
			<span class="component-prop-value">
				{#if JSON.stringify(prop[1]).split('\n').length > 1}
					<br />
				{/if}
				{JSON.stringify(prop[1], null, 4).replace(/^"|"$/gi, '')}
			</span>
			<span class="control-character">"</span>
		</p>
	{/each}
	<span class="control-character">/&gt;</span>
</aside>

<style>
	aside {
		color: var(--light-secondary);
		background-color: var(--bg-blue);
		padding: 2rem;
		margin: 1rem;
		border-radius: 0.5rem;
		word-break: break-word;
		height: fit-content;
		height: -moz-fit-content;
		flex-basis: 30%;
		flex-shrink: 1;
		flex-grow: 1;
		box-sizing: border-box;
	}

	aside.dark {
		background-color: var(--dark-primary);
	}

	legend {
		font-size: 1.5rem;
		font-weight: bold;
		text-transform: uppercase;
		color: var(--dark-primary);
		margin-block-start: -4rem;
		margin-block-end: 2.1rem;
		margin-inline-start: -1rem;
	}

	.dark legend {
		margin-block-start: -2.9rem;
		margin-block-end: 1.1rem;
		color: var(--light-secondary);
	}

	.html-tag {
		color: var(--bg-white);
		margin-inline-start: 1rem;
	}

	.control-character {
		color: var(--light-primary);
		margin-inline-end: -1rem;
	}

	.component-prop {
		color: var(--accent-red);
		margin-inline-start: 1rem;
		margin-block-start: 0;
		margin-block-end: 0;
		opacity: 0.95;
	}

	.component-prop-value {
		display: inline-block;
		color: var(--accent-orange);
		padding-inline-start: 2rem;
		text-indent: -1rem;
		opacity: 0.95;
	}

	@media (max-width: 440px) {
		aside {
			position: unset;
			margin-block-start: 2rem;
		}
	}
</style>
