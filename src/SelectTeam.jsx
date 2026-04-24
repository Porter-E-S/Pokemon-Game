import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function SelectTeam() {
  const types = [
    {"name":"bug","id":"7"},
    {"name":"dark","id":"17"},
    {"name":"dragon","id":"16"},
    {"name":"electric","id":"13"},
    //{"name":"fairy","id":"18"},
    {"name":"fighting","id":"2"},
    {"name":"fire","id":"10"},
    {"name":"flying","id":"3"},
    {"name":"ghost","id":"8"},
    {"name":"grass","id":"12"},
    {"name":"ground","id":"5"},
    {"name":"ice","id":"15"},
    {"name":"normal","id":"1"},
    {"name":"poison","id":"4"},
    {"name":"psychic","id":"14"},
    {"name":"rock","id":"6"},
    {"name":"steel","id":"9"},
    //{"name":"stellar","id":"19"},
    {"name":"unknown","id":"10001"},
    {"name":"water","id":"11"}
  ];

  const [pokemonList, set_pokemonList] = useState();
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.results)
        set_pokemonList(data.results);
        console.log("e", pokemonList)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  // add code for loading more pokemon when the user scrolls down
  // filtering by type
  // filtering by name

  function openfavorites(){
    document.querySelector("Favorites").setAttribute("open", true)
  }
  return (
    <>
      <h1>select team</h1>
      <button onclick={openfavorites}>favorites</button>
      <Favorites open="false"></Favorites>
      <input type="text" placeholder="Enter a name or ID"></input>
      <fieldset>
        {Object.entries(types).map(([index, data])=>(
          <>
            <input type="checkbox" key={index} value={data.name} />
            <lable>{data.name}</lable>
          </>
        ))}
      </fieldset>
      <ul>
        { pokemonList && Object.entries(pokemonList).map(([index, data])=>(
          <li>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"/>
            {data.name}</li>
          // add code for loading sprites
        ))}
      </ul>
      <Link to="/battle"><button>Start Battle</button></Link>
    </>
  )
}

export default SelectTeam
