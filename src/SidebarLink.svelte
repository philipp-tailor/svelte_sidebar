<script>
	export let url;
	export let name;
	export let route;
	export let childRoutes;
	export let level = 1;
</script>

<a href={route}>
	{name}
</a>
<br/>
