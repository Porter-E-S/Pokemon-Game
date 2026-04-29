import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Favorites from './Favorites.jsx';
import './SelectTeam.css';
import InfoPanel from './InfoPanel.jsx';

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
        //console.log(data.results)
        set_pokemonList(data.results);
        //console.log("e", pokemonList)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  // add code for loading more pokemon when the user scrolls down
  // filtering by type
  // filtering by name

  const [isFavesOpen, setFavesOpen] = useState(false);
  const [panelData, setPanelData] = useState([{
    forms:[{name:"???"}],
    id:"???",
    sprites:{front_default:null},
    //stats:{[{name:"hp"}]},
    types:[{type:{name:"unknown"}}]
}]
  );
  function showinfo(id){
    fetch('https://pokeapi.co/api/v2/pokemon/'+id)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPanelData([data]);
        //console.log(panelData)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  return (
    <>
    <div id="selectteam">
      <div id="header">
        <h2>Select Your Team</h2>
        {/*<button onClick={() => setFavesOpen(true)}>⭐ Favorites</button>*/}
        <div class="teamcontainer">
          <div>?</div><div>?</div><div>?</div>
        </div>
        <Link to="/battle"><button>Start Battle</button></Link>
      </div>
      <div class="favecontainer" style={{display:isFavesOpen ? "inline-block" : "none"}}>
        <button class="closefave" onClick={() => setFavesOpen(false)}>Close</button>
      <Favorites open={isFavesOpen}>
        
        </Favorites>
      </div>
      <input class="searchbar" type="text" placeholder="Enter a name or ID"></input>
      <div class="typefilters">
        {Object.entries(types).map(([index, data])=>(
          <div>
            <label aria-label={data.name}>
              <input type="checkbox" key={index} value={data.name} name={data.name} />
              <span style={{backgroundPosition:`left ${(data.offset[0]-1)*-64}px top ${(data.offset[1]-1)*-32-2}px`}}> 
              </span>
            </label>
          </div>
        ))}
      </div>
      <section id="main">
        <div class="pokemonlist">
      <ul>
        { pokemonList && Object.entries(pokemonList).map(([index, data])=>(
          <li onClick={()=>showinfo(index*1+1)}>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+(index*1+1)+".png"}/>
            <p class="pokemonname">{data.name}</p>
            <div id="buttons">
              <button>add to <span class="star"></span></button><br></br>
              <button>add to team</button>
            </div>
            </li>
          // add code for loading sprites
        ))}
      </ul>
      </div>
      <div class="pokemonlist"><Favorites></Favorites></div>
      <InfoPanel data={panelData}></InfoPanel>
      </section>
      </div>
    </>
  )
}

export default SelectTeam
