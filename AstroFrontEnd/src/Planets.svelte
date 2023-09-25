<script>
    import { onMount } from 'svelte';
    let planets = [];
  
    async function fetchPlanets() {
      console.log('fetching planets');
      const apiUrl = 'http://localhost:5172';
      const response = await fetch(`${apiUrl}/planets`);
      const data = await response.json();
      planets = data;
      console.log(planets);
    }
  
    async function addPlanet(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const description = event.target.description.value;
        const distanceFromSun = event.target.distanceFromSun.value;
        const newPlanet = { name, description, distanceFromSun };
        const apiUrl = 'http://localhost:5172';
        const response = await fetch(`${apiUrl}/planets`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlanet),
        });
        const data = await response.json();
        planets = [...planets, data];
        event.target.reset();
        }
  
    onMount(fetchPlanets);
  </script>
  
  <h1>Planets ({planets.length})</h1>
  
  <form on:submit={addPlanet}>
    <label>
      Name:
      <input type="text" name="name" required>
    </label>
    <label>
      Description:
      <textarea name="description" required></textarea>
    </label>
    <label>
      Distance from Sun (in millions of kilometers):
      <input type="number" name="distanceFromSun" required>
    </label>
    <button type="submit">Add Planet</button>
  </form>
  
  <ul>
    {#each planets as planet}
      <li>
        <h2>{planet.name}</h2>
        <p>{planet.description}</p>
        <p>Distance from Sun: {planet.distanceFromSun} million km</p>
      </li>
    {/each}
  </ul>