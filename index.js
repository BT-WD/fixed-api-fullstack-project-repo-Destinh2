document.getElementById("reveal-answer-btn").addEventListener("click", checkAnswer);
let currentPokemonName = "";

async function getPokemon() {
  try {
    const pokemonId = Math.floor(Math.random() * 1025) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();

    const img = document.getElementById("pokemon-img");

    currentPokemonName = data.name.toLowerCase(); // store correct name

    const imageUrl = data.sprites.other["official-artwork"].front_default;
    img.src = imageUrl;
    img.style.filter = "brightness(0)";
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
}

getPokemon();
function checkAnswer() {
  const userInput = document.getElementById("user-input");
  const guess = userInput.value.toLowerCase().trim();
  const img = document.getElementById("pokemon-img");
  if (guess === currentPokemonName) {
    alert("Correct!");
    img.style.filter = "brightness(1)";
    const li = document.createElement("li");
    li.textContent = currentPokemonName;
    document.getElementById("pokedex-list").appendChild(li);
    userInput.value = "";
    setTimeout(getPokemon, 1500);
  } else {
    alert("Wrong! Try again.");
  }
}
