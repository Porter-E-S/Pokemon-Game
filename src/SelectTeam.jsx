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
      .then(data => {
        data.results.forEach((e)=>{
          e.id = e.url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/","")
          e.longid = "000".slice(0, 3-e.id.length)+e.id
        })
        set_pokemonList(data.results);
      })
      .catch(error => {
        console.error('error fetching pokemon list', error);
      });
  }, []);

  const [isFavesOpen, setFavesOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState({})
  const [playerTeam, setPlayerTeam] = useState([])
  const filteredList = (Object.keys(typeFilter).length === 0) ? pokemonList : pokemonList ? pokemonList.filter((pokemon, index) => {
    const matchesSearch = pokemon.name.includes(search) || pokemon.id.toString().includes(search)
    var matchesType = []; // to match more than 1 type
    Object.values(typeFilter).forEach((data)=>{
      data.forEach((p)=>{
        if (p.pokemon.name == pokemon.name) {matchesType.push(true)}
      })
    })
    console.log(matchesType)
    console.log("len 0", Object.keys(typeFilter).length === 0)
    return matchesSearch && (matchesType.length == Object.keys(typeFilter).length)
  }) : []

  const typeChange = (typeName) => {
    if (Object.keys(typeFilter).includes(typeName)) {
      setTypeFilter(prev => {
        const { [typeName]: removed, ...rest } = prev;
        return rest;
      })
    } else {
      var id = types.find(t => t.name == typeName).id
      fetch(`https://pokeapi.co/api/v2/type/${id}`)
      .then(r => r.json())
      .then(data => setTypeFilter({...typeFilter, [typeName]:data.pokemon}));
      console.log(typeFilter)
    }
  }

  const addToTeam = (pokemon) => {
    if (playerTeam.includes(pokemon)) { //remove pokemon
      //playerTeam.splice(playerTeam.indexOf(pokemon), 1)
      setPlayerTeam(playerTeam => playerTeam.filter(item => item.id !== pokemon.id));
    }
    else if (playerTeam.length >= 3) {
      return
    }
    else{
      setPlayerTeam([...playerTeam, pokemon])
    }
    console.log(playerTeam)
  }

  const selectPokemon = (event, id) => {
    if (event.target === event.currentTarget) {
    // prevent clicking the purple buttons from opening pokemon in the info panel
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(r => r.json())
      .then(data => setSelectedPokemon(data));
    }
  }

  const [favorites, setFavorites] =  useState(() => {
  const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  function addFavorite(data){
    if (favorites.includes(data)) { //remove pokemon
      setFavorites(favorites => favorites.filter(item => item.id !== data.id));
    }
    else{
      setFavorites([...favorites, data])
    }
  }
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log(favorites)
  }, [favorites]);

  return (
    <>
    <div id="selectteam">
      <div id="header">
        <h2>Select Your Team:</h2>
        {/*<button onClick={() => setFavesOpen(true)}>⭐ Favorites</button>*/}
        <div className="teamcontainer">
          {playerTeam.map((p)=>(
          <div class="teammember">
            <div class="iconcontainer">
              <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/"+p.id+".png"}></img>
            </div>
          <p class="pokemonname">{p.name}</p>
          </div>
          ))}
        </div>
        <Link to="/battle"><button onClick={() => navigate('/battle', { state: { team: playerTeam } })}>Start Battle</button></Link>
      </div>

      <div className="favecontainer" style={{display:isFavesOpen ? "inline-block" : "none"}}>
        <button className="closefave" onClick={() => setFavesOpen(false)}>Close</button>
      <Favorites open={isFavesOpen}></Favorites>
      </div>

      {/* SEARCH */}
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
        { filteredList && filteredList.map((data)=>(
          <li key={data.id} onClick={(event) => selectPokemon(event, data.id)}>
            <img loading="lazy" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/"+ data.id +".png"}/>
            <p class="pokemonname">{data.longid+". "+data.name}</p>
            <div id="buttons">
              <button class="fave" onClick={() => addFavorite(data)}>
                {favorites.includes(data) ? "remove from" : "add to" }
                </button><br/>
                <button onClick={() => addToTeam(data)}>
                  {playerTeam.includes(data) ? "remove from" : "add to" } team
                </button>
            </div>
            </li>
        ))}
      </ul>
      </div>

      {/* FAVORITES */}
      <div class="pokemonlist">
        <ul>
        { favorites ? favorites.map((data)=>(
          <li key={data.id} onClick={(event) => selectPokemon(event, data.id)}>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/"+data.id+".png"}/>
            <p className="pokemonname">{data.longid+". "+data.name}</p>
            <div id="buttons">
              <button class="fave" onClick={() => addFavorite(data)}>
                {favorites.includes(data) ? "remove from" : "add to" }
                </button><br/>
              <button onClick={() => addToTeam(data)}>
                  {playerTeam.includes(data) ? "remove from" : "add to" } team
                </button>
            </div>
            </li>
          // add code for loading sprites
        )) : <p>no favorites yet...</p>}
        </ul>
      </div>

      {/* INFO PANEL */}
      <div id="infopanel">
        {selectedPokemon ? (
          <>
            <div class="nameandimgbox">
              <h2>{selectedPokemon.name}</h2>
              <img src={selectedPokemon.sprites.front_default} />
            </div>
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
