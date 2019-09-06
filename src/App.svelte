<script>
	import { authenticatedRoutes as routes } from './routes';
	import Sidebar from './Sidebar.svelte';

	let url = '/checkout/confirmation/success';
</script>

<style>
</style>

<Sidebar url={url} routes={routes} />
<main class="route-content">
	<!-- ToDo: add dropdown to select an URL to see the influence on the menu -->
</main>