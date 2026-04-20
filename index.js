async function getPokemon(name) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const data = await response.json();

          const imageUrl = data.sprites.other["official-artwork"].front_default;

          document.getElementById("pokemon-img").src = imageUrl;
        } catch (error) {
        console.error("Error fetching Pokémon:", error);
        }
      }

getPokemon("charmander");
