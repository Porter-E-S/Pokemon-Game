import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Favorites from './Favorites.jsx';
import './SelectTeam.css';

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

  const [isFavesOpen, setFavesOpen] = useState(false);

  
  return (
    <>
    <div id="selectteam">
      <h2>Select Your Team</h2>
      <button onClick={() => setFavesOpen(true)}>⭐ Favorites</button>
      <Link to="/battle"><button>Start Battle</button></Link>
      <div class="favecontainer" style={{display:isFavesOpen ? "inline-block" : "none"}}>
        <button class="closefave" onClick={() => setFavesOpen(false)}>Close</button>
      <Favorites open={isFavesOpen}>
        
        </Favorites>
      </div>
      <input class="searchbar" type="text" placeholder="Enter a name or ID"></input>
      <fieldset>
        {Object.entries(types).map(([index, data])=>(
          <div>
            <input type="checkbox" key={index} value={data.name} />
            <lable>{data.name}</lable>
          </div>
        ))}
      </fieldset>
      <section>
      <ul>
        { pokemonList && Object.entries(pokemonList).map(([index, data])=>(
          <li>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+(index*1+1)+".png"}/>
            <span>{data.name}</span>
            </li>
          // add code for loading sprites
        ))}
      </ul>
      <div id="infopanel">
        <h2></h2>
        <p>select a pokemon to view its info</p>
      </div>
      </section>
      </div>
    </>
  )
}

export default SelectTeam
