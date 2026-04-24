document.getElementById("reveal-answer-btn").addEventListener("click", checkAnswer);
document.getElementById("show-answer-btn").addEventListener("click", showAnswer);
let currentPokemonName = "";
let currentImageUrl = "";
let username = "";
let pokedex = [];

function savePokedex() {
  localStorage.setItem("pokedex_" + username, JSON.stringify(pokedex));
}

function loadPokedex() {
  const stored = localStorage.getItem("pokedex_" + username);
  if (stored) {
    pokedex = JSON.parse(stored);
    pokedex.forEach(poke => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = poke.imageUrl;
      img.alt = poke.name;
      img.style.width = "50px";
      img.style.marginRight = "10px";
      li.appendChild(img);
      const span = document.createElement("span");
      span.textContent = poke.name;
      li.appendChild(span);
      document.getElementById("pokedex-list").appendChild(li);
    });
  }
}

// Hide main initially
document.querySelector("main").style.display = "none";

// Login functionality
document.getElementById("login-btn").addEventListener("click", () => {
  username = document.getElementById("username-input").value.trim();
  if (username) {
    document.getElementById("login-container").style.display = "none";
    document.querySelector("main").style.display = "block";
    loadPokedex();
    getPokemon();
  }
});

async function getPokemon() {
  try {
    const pokemonId = Math.floor(Math.random() * 1025) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();

    const img = document.getElementById("pokemon-img");

    currentPokemonName = data.name.toLowerCase(); // store correct name

    const imageUrl = data.sprites.other["official-artwork"].front_default;
    currentImageUrl = imageUrl;
    img.src = imageUrl;
    img.style.filter = "brightness(0)";
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
}

function checkAnswer() {
  const userInput = document.getElementById("user-input");
  const guess = userInput.value.toLowerCase().trim();
  const img = document.getElementById("pokemon-img");
  const feedback = document.getElementById("feedback");
  if (guess === currentPokemonName) {
    feedback.textContent = "Correct!";
    img.style.filter = "brightness(1)";
    pokedex.push({name: currentPokemonName, imageUrl: currentImageUrl});
    savePokedex();
    const li = document.createElement("li");
    const pokeImg = document.createElement("img");
    pokeImg.src = currentImageUrl;
    pokeImg.alt = currentPokemonName;
    pokeImg.style.width = "50px";
    pokeImg.style.marginRight = "10px";
    li.appendChild(pokeImg);
    const span = document.createElement("span");
    span.textContent = currentPokemonName;
    li.appendChild(span);
    document.getElementById("pokedex-list").appendChild(li);
    userInput.value = "";
    setTimeout(() => {
      feedback.textContent = "";
      getPokemon();
    }, 1500);
  } else {
    feedback.textContent = "Wrong! Try again.";
  }
}
function showAnswer() {
  const img = document.getElementById("pokemon-img");
  const feedback = document.getElementById("feedback");
  const userInput = document.getElementById("user-input");
  img.style.filter = "brightness(1)";
  feedback.textContent = `The answer was: ${currentPokemonName}`;
  userInput.value = "";

  setTimeout(() => {
    feedback.textContent = "";
    getPokemon();
  }, 2000);
}
