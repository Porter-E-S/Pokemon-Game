function Favorites({favorites}) {
  

  return (
    <>
    {/*<h2>Favorites</h2-->*/}
    
    <ul>
        { favorites ? favorites.map((p)=>(
          <li key={p.id}>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/"+p.id+".png"}/>
            <p className="pokemonname">{p.name}</p>
            <div id="buttons">
              <button class="fave">remove</button><br></br>
              <button>add to team</button>
            </div>
            </li>
          // add code for loading sprites
        )) : <p>no favorites yet...</p>}
        </ul>
    
    </>
  )
}

export default Favorites
