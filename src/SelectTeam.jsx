import React, { useState, useEffect } from 'react';
import Favorites from './Favorites.jsx';
import './SelectTeam.css';
import { Link, useNavigate } from 'react-router-dom';


function SelectTeam() {
  const types = [
    {"name":"bug","id":"7", offset:[3,2]},
    {"name":"dark","id":"17", offset:[2,5]},
    {"name":"dragon","id":"16", offset:[1,5]},
    {"name":"electric","id":"13", offset:[2,4]},
    //{"name":"fairy","id":"18"},
    {"name":"fighting","id":"2", offset:[2,1]},
    {"name":"fire","id":"10", offset:[3,3]},
    {"name":"flying","id":"3", offset:[3,1]},
    {"name":"ghost","id":"8", offset:[4,2]},
    {"name":"grass","id":"12", offset:[1,4]},
    {"name":"ground","id":"5", offset:[1,2]},
    {"name":"ice","id":"15", offset:[4,4]},
    {"name":"normal","id":"1", offset:[1,1]},
    {"name":"poison","id":"4", offset:[4,1]},
    {"name":"psychic","id":"14", offset:[3,4]},
    {"name":"rock","id":"6", offset:[2,2]},
    {"name":"steel","id":"9", offset:[1,3]},
    //{"name":"stellar","id":"19"},
    //{"name":"unknown","id":"10001", offset:[2,3]},
    {"name":"water","id":"11", offset:[4,3]}
  ];

  const [pokemonList, set_pokemonList] = useState();
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(async data => {
        const detailed = await Promise.all(
          data.results.map((pokemon, index) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
              .then( r => r.json())
              .then(p => ({
                name: pokemon.name,
                type: p.types[0].type.name,
                id: index + 1
              }))
        )
      )
      set_pokemonList(detailed)
    })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  // add code for loading more pokemon when the user scrolls down
  // filtering by type
  // filtering by name

  const [isFavesOpen, setFavesOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState([])
  const [playerTeam, setPlayerTeam] = useState([])
  const filteredList = pokemonList ? pokemonList.filter((pokemon, index) => {
    const id = index + 1
    const matchesSearch = pokemon.name.includes(search) || id.toString().includes(search)
    const matchesType = typeFilter.length === 0 || typeFilter.includes(pokemon.type)
    return matchesSearch && matchesType
  }) : []
  const typeChange = (typeName) => {
    if (typeFilter.includes(typeName)) {
      setTypeFilter(typeFilter.filter(t => t !== typeName))
    } else {
      setTypeFilter([...typeFilter, typeName])
    }
  }
  const addToTeam = (pokemon) => {
    if (playerTeam.length >= 3) {
      return
    }
    if (playerTeam.includes(pokemon)) {
      return
    }
    setPlayerTeam([...playerTeam, pokemon])
  }

  const selectPokemon = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(r => r.json())
      .then(data => setSelectedPokemon(data));
  }


  return (
    <>
    <div id="selectteam">
      <h2>Select Your Team</h2>
      {/*<button onClick={() => setFavesOpen(true)}>⭐ Favorites</button>*/}
      <p>Team: {playerTeam.map(p => p.name).join(', ')}</p>
      <button onClick={() => navigate('/battle', { state: { team: playerTeam } })}>Start Battle</button>
      <div class="favecontainer" style={{display:isFavesOpen ? "inline-block" : "none"}}>
        <button class="closefave" onClick={() => setFavesOpen(false)}>Close</button>
      <Favorites open={isFavesOpen}>
        
        </Favorites>
      </div>
      <input class="searchbar" type="text" placeholder="Enter a name or ID" value={search} onChange={e => setSearch(e.target.value)}></input>
      <div class="typefilters">
        {Object.entries(types).map(([index, data])=>(
          <div>
            <label aria-label={data.name}>
              <input type="checkbox" key={index} value={data.name} name={data.name} onChange={() => typeChange(data.name)}/>
              <span style={{backgroundPosition:`left ${(data.offset[0]-1)*-64}px top ${(data.offset[1]-1)*-32-2}px`}}> 
              </span>
            </label>
          </div>
        ))}
      </div>
      <section id="main">
        <div class="pokemonlist">
      <ul>
        { filteredList && filteredList.map((data, index)=>(
          <li>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ data. id +".png"}/>
            <p class="pokemonname">{data.name}</p>
            <div id="buttons">
              <button>add to favorites</button><br></br>
              <button onClick={() => addToTeam(data)}>add to team</button><br></br>
              <button onClick={() => selectPokemon(data.id)}>view info</button>
            </div>
            </li>
          // add code for loading sprites
        ))}
      </ul>
      </div>
      <div class="pokemonlist"><Favorites></Favorites></div>
      <div id="infopanel">
        {selectedPokemon ? (
          <>
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.sprites.front_default} />
            <p>Type: {selectedPokemon.types.map(t => t.type.name).join(', ')}</p>
            <p>Height: {selectedPokemon.height / 10}m</p>
            <p>Weight: {selectedPokemon.weight / 10}kg</p>
            <p>Abilities: {selectedPokemon.abilities.map(a => a.ability.name).join(', ')}</p>
            <p>Base Stats:</p>
            <ul>
              {selectedPokemon.stats.map(s => (
                <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>select a pokemon to view its info</p>
        )}
      </div>
      </section>
      </div>
    </>
  )
}

export default SelectTeam
