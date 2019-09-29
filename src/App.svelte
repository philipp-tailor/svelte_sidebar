<script>
	import { authenticatedRoutes as routes } from './routes';
	import Sidebar from './Sidebar.svelte';

	let activeUrl = '/checkout/confirmation/success';
	const onLinkClick = (event) => alert(`'${event.target.href}' clicked`);
</script>

<Sidebar
	activeUrl={activeUrl}
	routes={routes}
	onLinkClick={onLinkClick}
	open={window.innerWidth > 720}
/>
<main class='route-content'>
	<!-- ToDo: add dropdown to select an URL to see the influence on the menu -->
</main>

<style>
	.route-content {
		background-color: #F7F7F2;
	}
</style>