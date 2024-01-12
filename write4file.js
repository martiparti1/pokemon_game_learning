const fs = require('fs');

class Pokemon {
    constructor(name, type1, type2, frontSprite, generation, evolutionType) {
        this.name = name;
        this.type1 = type1;
        this.type2 = type2;
        this.frontSprite = frontSprite;
        this.generation = generation;
        this.evolutionType = evolutionType;
    }

    toJSON() {
        return { 
            name: this.name, 
            type1: this.type1, 
            type2: this.type2, 
            frontSprite: this.frontSprite, 
            generation: this.generation,
            evolutionType: this.evolutionType
        };
    }
}

var pokemonArray = [];
var evolutionData = {};

// Fetch evolution data from the specified URLs
function fetchEvolutionData() {
    const evolutionUrls = [
        'https://pokeapi.co/api/v2/evolution-trigger/2',
        'https://pokeapi.co/api/v2/evolution-trigger/3'
    ];

    Promise.all(evolutionUrls.map(url => fetch(url).then(response => response.json())))
        .then(dataArray => {
            dataArray.forEach(data => {
                data.pokemon_species.forEach(pokemon => {
                    evolutionData[pokemon.name] = data.name;
                });
            });
            fetchPokemonData(1)
            
        })
    .catch(error => console.error('Error fetching evolution data:', error));
}

function fetchSecondData() {
    const evolutionUrls = [
        'https://pokeapi.co/api/v2/evolution-trigger/2',
        'https://pokeapi.co/api/v2/evolution-trigger/3'
    ];

    Promise.all(evolutionUrls.map(url => fetch(url).then(response => response.json())))
        .then(dataArray => {
            dataArray.forEach(data => {
                data.pokemon_species.forEach(pokemon => {
                    evolutionData[pokemon.name] = data.name;
                });
            });
            
            fetchSpecialPokemon(10001);
            
        })
    .catch(error => console.error('Error fetching evolution data:', error));
}

function fetchThirdData() {
    const evolutionUrls = [
        'https://pokeapi.co/api/v2/evolution-trigger/2',
        'https://pokeapi.co/api/v2/evolution-trigger/3'
    ];

    Promise.all(evolutionUrls.map(url => fetch(url).then(response => response.json())))
        .then(dataArray => {
            dataArray.forEach(data => {
                data.pokemon_species.forEach(pokemon => {
                    evolutionData[pokemon.name] = data.name;
                });
            });
            
            fetchThirdBatch(10272);
        })
    .catch(error => console.error('Error fetching evolution data:', error));
}

function fetchPokemonData(pokemonId) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const name = data.name;
            const type1 = data.types[0].type.name;
            const type2 = data.types[1] ? data.types[1].type.name : null;
            const frontSprite = data.sprites.front_default;
            const speciesUrl = data.species.url;

            fetch(speciesUrl)
                .then(response => response.json())
                .then(speciesData => {
                    const generation = speciesData.generation.name;
                    const evolutionType = evolutionData[name] || 'default';
                    const newPokemon = new Pokemon(name, type1, type2, frontSprite, generation, evolutionType);
                    pokemonArray.push(newPokemon);
                    console.log("Pokemon data successfully pushed")
                    console.log("+1");

                    if (pokemonId < 1025) {
                        fetchPokemonData(pokemonId + 1);
                    } 

                    else {
                        const jsonData = JSON.stringify(pokemonArray.map(pokemon => pokemon.toJSON()), null, 2);
                        fs.writeFileSync('4thfile.json', jsonData);
                        console.log('Data written to 4thfile.json');
                    }
                })            
        })
        .catch(error => console.error('Error fetching Pokemon data:', error));
}

function fetchSpecialPokemon(pokemonId){
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const name = data.name;
            const type1 = data.types[0].type.name;
            const type2 = data.types[1] ? data.types[1].type.name : null;
            const frontSprite = data.sprites.front_default;
            const speciesUrl = data.species.url;

            fetch(speciesUrl)
                .then(response => response.json())
                .then(speciesData => {
                    const generation = speciesData.generation.name;
                    const evolutionType = evolutionData[name] || 'default';
                    const newPokemon = new Pokemon(name, type1, type2, frontSprite, generation, evolutionType);
                    
                    if(newPokemon.name.includes('pikachu')){
                        console.log('capchu')
                    }
                    else{
                        pokemonArray.push(newPokemon);
                        console.log("Special Pokemon data successfully pushed")
                        console.log("+1");
                    }

                    if (pokemonId < 10263) {
                        fetchSpecialPokemon(pokemonId + 1);
                    } 

                    else {
                        const jsonData = JSON.stringify(pokemonArray.map(pokemon => pokemon.toJSON()), null, 2);
                        fs.writeFileSync('4thfile.json', jsonData);
                        console.log('Data from the second batch written to 4thfile.json');
                    }
                })            
        })
        .catch(error => console.error('Error fetching Pokemon data:', error));
}

function fetchThirdBatch(pokemonId){
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const name = data.name;
            const type1 = data.types[0].type.name;
            const type2 = data.types[1] ? data.types[1].type.name : null;
            const frontSprite = data.sprites.front_default;
            const speciesUrl = data.species.url;

            fetch(speciesUrl)
                .then(response => response.json())
                .then(speciesData => {
                    const generation = speciesData.generation.name;
                    const evolutionType = evolutionData[name] || 'default';
                    const newPokemon = new Pokemon(name, type1, type2, frontSprite, generation, evolutionType);
                
                    pokemonArray.push(newPokemon);
                    console.log("Third batch of Special Pokemon data successfully pushed")
                    console.log("+1");

                    if (pokemonId < 10277) {
                        fetchThirdBatch(pokemonId + 1);
                    } 

                    else {
                        const jsonData = JSON.stringify(pokemonArray.map(pokemon => pokemon.toJSON()), null, 2);
                        fs.writeFileSync('4thfile.json', jsonData);
                        console.log('All is done');
                    }
                })            
        })
        .catch(error => console.error('Error fetching Pokemon data:', error));
}

// Start the process
fetchEvolutionData();
fetchSecondData();
fetchThirdData();