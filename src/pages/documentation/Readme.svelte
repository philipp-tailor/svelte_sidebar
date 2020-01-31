<script>
	import { afterUpdate, onDestroy, onMount } from 'svelte'

	export let pathname

	let readme
	let intersectionObserver

	onMount(async () => {
		;({ default: readme } = await import('../../../README.md'))

		initHeadingIntersectionObserver()
	})

	// When the URL was changed through `Sidebar`, scroll to referenced heading.
	afterUpdate(() => {
		scrollToHeading()
	})

	onDestroy(() => {
		intersectionObserver && intersectionObserver.disconnect()
	})

	const initHeadingIntersectionObserver = () => {
		// Await DOM completion.
		setTimeout(() => {
			const headers = document.querySelectorAll('h2, h3, h4')

			const headerConfig = {
				/*
				 * Watch for intersections in the top area of the screen.
				 * If a heading is in the top stripe, it can be assumed that the
				 * user is reading the paragraph, warranting a route update.
				 */
				rootMargin: `0px 0px -${window.innerHeight - 50}px 0px`,
				threshold: 0.5
			}
			intersectionObserver = new IntersectionObserver(
				detectHeaderIntersection,
				headerConfig
			)
			headers.forEach(header => intersectionObserver.observe(header))
		}, 500)
	}

	/*
	 * Add heading IDs to url hash when read. This has two benefits:
	 * - The sidebar shows a correct active navigation link state.
	 * - The user can pick up where he left on reload.
	 */
	const detectHeaderIntersection = entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const element = entry.target
				const headerName = element.id

				const newUrl = `${window.location.pathname}#${headerName}`
				history.replaceState(
					{},
					`Svelte Sidebar – ${headerName}`,
					newUrl
				)

				// Update route state in `App` (there's a prop binding).
				const newPathname = newUrl.replace(window.location.origin, '')
				pathname = newPathname
			}
		})
	}

	// Scroll to header referenced in URL hash (if existing).
	const scrollToHeading = () => {
		const urlHash = window.location.hash
		if (urlHash) {
			const focusedHeader = document.getElementById(
				urlHash.replace('#', '')
			)
			focusedHeader && focusedHeader.scrollIntoView()
		}
	}
</script>

<style>
	article {
		max-width: 120ch;
	}

	:global(article a) {
		color: inherit;
		border: none;
		outline: none;
	}

	:global(article a:hover),
	:global(article a:focus) {
		background-color: var(--dark-primary);
		color: var(--accent-orange);
	}

	:global(h1) {
		font-weight: bold;
		font-size: 2rem;
		margin: 0;
		margin-bottom: 0.5rem;
		word-break: break-word;
		line-height: 1.2;
		padding: 0.4ch 0;
		text-transform: uppercase;
	}

	:global(h2),
	:global(h3) {
		word-break: break-word;
		line-height: 1.2;
		text-transform: capitalize;
		margin-right: 0;
		margin-bottom: 1.5rem;
		margin-left: 0;
	}

	:global(h2) {
		margin-top: 2.5rem;
		font-size: 1.75rem;
		text-transform: uppercase;
	}

	:global(h3) {
		margin-top: 2rem;
		font-size: 1.5rem;
		font-weight: 400;
	}

	:global(p) {
		margin: 0;
		margin-top: 1.5rem;
	}

	:global(p:first-of-type) {
		margin-top: 1rem;
	}

	:global(li) {
		margin-top: 0.4rem;
	}

	:global(ul + p),
	:global(ol + p) {
		margin-top: 0.4rem;
	}

	:global(ul),
	:global(ol) {
		margin: 0;
		padding-left: 2ch;
	}

	:global(pre) {
		background-color: var(--bg-blue-primary);
		color: var(--accent-orange);
		font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
		border-radius: 0.4rem;
		padding: 1.5rem;
		overflow: auto;
		font-size: 0.85rem;
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		line-height: 1.5;
		-moz-tab-size: 4;
		-o-tab-size: 4;
		tab-size: 4;
		-webkit-hyphens: none;
		-moz-hyphens: none;
		-ms-hyphens: none;
		hyphens: none;
	}

	:global(table) {
		position: relative;
		margin-top: 1rem;
		width: 100%;
		background-color: var(--bg-blue-primary);
		color: var(--light-primary);
		border-radius: 0.5rem;
		padding: 0.5rem;
	}

	:global(tr th:first-of-type) {
		border-left: none;
	}

	:global(th) {
		top: 0;
		position: sticky;
		background: var(--accent-red);
		padding: 0.4rem 0.6rem;
		border-radius: 0.5rem;
	}

	:global(td) {
		padding: 0.4rem 0.6rem;
		vertical-align: top;
		min-height: 3rem;
	}

	@media (min-width: 420px) {
		:global(h1) {
			font-size: 3rem;
			margin-bottom: 1.5rem;
		}

		:global(h2) {
			margin-top: 3rem;
		}

		:global(h3) {
			margin-top: 2.5rem;
		}
	}

	@media (prefers-color-scheme: light) {
		:global(article) {
			height: intrinsic;
			margin: 1rem 1rem 2rem;
			padding: 0.5rem 1rem 2rem;
			background-color: var(--bg-white);
			border-radius: 0.5rem;
		}
	}

	@media (prefers-color-scheme: dark) {
		:global(article) {
			margin: 0.5rem 1rem 2rem;
		}

		:global(pre) {
			background-color: var(--dark-primary);
		}

		:global(table) {
			background-color: var(--dark-primary);
		}
	}
</style>

<!-- When there's a hash change in the URL, scroll to the referenced heading. -->
<svelte:window on:hashchange={scrollToHeading} />

<article>
	{@html readme}
</article>
