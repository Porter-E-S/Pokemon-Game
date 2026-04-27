function Favorites() {

    /*fetch from local storage*/
const temp = {
    6: "charizard",
    3: "venusaur",
    9: "blastoise"
}
  return (
    <>
    {/*<h2>Favorites</h2-->*/}
    
    <ul>
        { Object.entries(temp).map(([index, data])=>(
          <li>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+index+".png"}/>
            <p class="pokemonname">{data.name}</p>
            <div id="buttons">
              <button>remove from favorites</button><br></br>
              <button>add to team</button>
            </div>
            </li>
          // add code for loading sprites
        ))}
        </ul>
    
    </>
  )
}

export default Favorites
