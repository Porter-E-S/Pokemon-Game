import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function SelectTeam() {

  //const [name, data] = useState({});
  const [types, setTypes] = useState();
  //localStorage.setItem('types', JSON.stringify(types));
console.log("hi")
  //"https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
const fetchPokemonOfType = async (id) => {
  const response = await fetch("https://pokeapi.co/api/v2/type/" + id)
  const data = await response.json()
  data.pokemon.forEach(e)
  return {
    name: name,
    type: type,
    maxHp: hp,
    currentHp: hp,
    attack: attack,
    moves: moves,
    sprite: sprite,
  }
}
if (!types){
  fetch('https://pokeapi.co/api/v2/type/')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      setTypes(data.results)
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
  return (
    <>
      <h1>select team</h1>
      <input type="text"></input>
      <select>
        {Object.entries(types).map(([index, data])=>(
          <option key={index} value={data.name}>{data.name}</option>
        ))}
      </select>
      {/*Object.entries(classrooms).map(([room, data]) => (
          <li key={room}>
            name: {data.name}
          </li>
        ))*/}
      <Link to="/battle"><button>Start Battle</button></Link>
    </>
  )
}

export default SelectTeam
