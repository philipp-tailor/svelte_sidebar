<script>
	import { authenticatedRoutes as routes } from './routes';
	import Sidebar from './Sidebar.svelte';

	let activeUrl = '/checkout/confirmation/success';
</script>

<Sidebar activeUrl={activeUrl} routes={routes} />
<main class="route-content">
	<!-- ToDo: add dropdown to select an URL to see the influence on the menu -->
</main>

<style>
	.route-content {
		background-color: #ccc;
		height: 100vh;
	}
</style>