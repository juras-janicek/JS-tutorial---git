const search_but = document.getElementById("search_pokemon")



search_but.addEventListener('click', async function (){
    try {
        const pokemon = document.getElementById("pokemon").value.toLowerCase()

        const pokemon_img = document.getElementById("display")

        // fetch() vrací Promise - čekáme na odpověď serveru
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (!response.ok){throw new Error("pokemon neexistuje")}

        const information  = await response.json();

        const img = information.sprites.front_default;

        pokemon_img.src = img

        pokemon_img.style.display = "block"

        
    } catch (chyba) {
        console.error("něco se pokazilo: ", chyba)
    }
})

