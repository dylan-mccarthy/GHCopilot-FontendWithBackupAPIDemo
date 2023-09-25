<script>
    import { onMount } from 'svelte';

    let moons = [];
    let planets = [];
  
    async function fetchMoons() {
      console.log('fetching moons');
      const apiUrl = 'http://localhost:5172';
      const response = await fetch(`${apiUrl}/moons`);
      const data = await response.json();
      moons = data;
      console.log(moons);
    }

    async function fetchPlanets() {
        console.log('fetching planets');
        const apiUrl = 'http://localhost:5172';
        const response = await fetch(`${apiUrl}/planets`);
        const data = await response.json();
        planets = data;
        console.log(planets);
    }
  
    async function addMoon(event) {
      event.preventDefault();
      const name = event.target.name.value;
      const description = event.target.description.value;
      const distanceFromPlanet = event.target.distanceFromPlanet.value;
      const planetId = parseInt(event.target.planet.value);
      const newMoon = { name, description, distanceFromPlanet, planetId };
      console.log(JSON.stringify(newMoon));
      const apiUrl = 'http://localhost:5172';
      const response = await fetch(`${apiUrl}/moons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMoon),
      });
      const data = await response.json();
      moons = [...moons, data];
      event.target.reset();
    }
  
    onMount(fetchPlanets);
    onMount(fetchMoons);
  </script>
  
  <h1>Moons ({moons.length})</h1>
  
  <form on:submit={addMoon}>
    <label>
      Name:
      <input type="text" name="name" required>
    </label>
    <label>
      Description:
      <textarea name="description" required></textarea>
    </label>
    <label>
      Distance from Planet:
      <input type="number" name="distanceFromPlanet" required>
    </label>
    <label>
      Planet:
      <select name="planet" required>
        <option value="">-- Select a planet --</option>
        {#each planets as planet}
          <option value={planet.Id}>{planet.name}</option>
        {/each}
      </select>
    </label>
    <button type="submit">Add Moon</button>
  </form>
  
  <ul>
    {#each moons as moon}
      <li>
        <h2>{moon.name}</h2>
        <p>{moon.description}</p>
        <p>Distance from Planet: {moon.distanceFromPlanet}</p>
      </li>
    {/each}
  </ul>