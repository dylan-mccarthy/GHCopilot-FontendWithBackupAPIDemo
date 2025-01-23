<script>
	import { Router, Link, Route } from 'svelte-routing';
	import Planets from './Planets.svelte';
	import Moons from './Moons.svelte';
</script>

<Router>
	<nav>
		<Link to="/">Home</Link>
		<Link to="planets">Planets</Link>
		<Link to="moons">Moons</Link>
	</nav>
	<div class="main-container">
		<Route path="/"></Route>
		<Route path="planets" component={Planets} />
		<Route path="moons" component={Moons} />
	</div>
</Router>

<style>
	.main-container {
		font-size: 18px;
		color: green;
	}
</style>
