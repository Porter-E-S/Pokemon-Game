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
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/"+index+".png"}/>
            <p className="pokemonname">{data}</p>
            <div id="buttons">
              <button class="fave">remove</button><br></br>
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
