import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const TYPE_MATCHUPS = {
    grass: {
        ground: 2,
        rock: 2,
        water: 2,
        fire: 0.5,
        ice: 0.5,
        poison: 0.5,
        flying: 0.5,
        bug: 0.5
    },
    water: {
        fire: 2.0,
        ground: 2.0,
        rock: 2.0,
        electric: 0.5,
        grass: 0.5
    },
    fire: {
        grass: 2.0,
        ice: 2.0,
        bug: 2.0,
        ground: 0.5,
        rock: 0.5,
        water: 0.5
    },
    electric: {
        water: 2.0,
        flying: 2.0,
        ground: 0.5
    },
    ice: {
        grass: 2.0,
        flying: 2.0,
        ground: 2.0,
        fire: 0.5,
        fighting: 0.5,
        rock: 0.5
    },
    fighting: {
        normal: 2.0,
        rock: 2.0,
        ice: 2.0,
        flying: 0.5
    },
    poison: {
        grass: 2.0,
        ground: 0.5,
        rock: 0.5
    },
    ground: {
        electric: 2.0,
        fire: 2.0,
        poison: 2.0,
        rock: 2.0,
        water: 0.5,
        grass: 0.5,
        ice: 0.5
    },
    normal: {
        fighting: 0.5
    },
    flying: {
        fighting: 2.0,
        bug: 2.0,
        grass: 2.0,
        electric: 0.5,
        ice: 0.5,
        rock: 0.5
    },
    psychic: {
        fighting: 2.0,
        poison: 2.0,
        bug: 0.5,
        ghost: 0.5
    },
    ghost: {
        psychic: 2.0,
        ghost: 2.0
    },
    dragon: {
        dragon: 2.0,
        ice: 0.5,
    }
}

const getMultiplier = (attackerType, defenderType) => {
  if (TYPE_MATCHUPS[attackerType] === undefined) {
    return 1;
  }
  if (TYPE_MATCHUPS[attackerType][defenderType] === undefined) {
    return 1;
  }
  return TYPE_MATCHUPS[attackerType][defenderType]
}
//fetches data about pokemon from api
const fetchPokemon = async (id) => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id)
  const data = await response.json()
  const hp = data.stats.find(s => s.stat.name === "hp").base_stat
  const name = data.name
  const attack = data.stats.find(s => s.stat.name === "attack").base_stat
  const type = data.types[0].type.name
  const moves = data.moves.slice(0, 4).map(m => m.move.name)
  const sprite = data.sprites.front_default
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
//gets random pokemon for cpu team
const getRandomIds = (count) => {
  const ids = []
  for (let i = 0; i < count; i++) {
    ids.push(Math.floor(Math.random() * 151) + 1)
  }
  return ids
}

function Battle() {

  //sets up battle state
  const [playerParty, setPlayerParty] = useState([])
  const [cpuParty, setCpuParty] = useState([])
  const [playerIndex, setPlayerIndex] = useState(0)
  const [cpuIndex, setCpuIndex] = useState(0)
  const [log, setLog] = useState([])
  const [phase, setPhase] = useState("loading")
  const navigate = useNavigate()
  //loads teams
  useEffect(() => {
    const loadTeams = async () => {
      const ids = getRandomIds(3)
      const cpuTeam = await Promise.all(ids.map(id => fetchPokemon(id)))
      setCpuParty(cpuTeam)
      setPhase("player-turn")
    }
      loadTeams()
  }, [])

  //shows current pokemon
  const playerPokemon = playerParty[playerIndex]
  const cpuPokemon = cpuParty[cpuIndex]

  //this prevents pokemon from being fetched when they are undefined
  if (phase === "loading" || !playerPokemon || !cpuPokemon) {
    return <p>Battle loading!</p>
  }

  //this is for taking the dmg and applying it to the cpus selected pokemon
  const playerAttack = (moveIndex) => {
    const multiplier = getMultiplier(playerPokemon.type, cpuPokemon.type)
    const damage = Math.round(playerPokemon.attack * multiplier)

    const updatedCpuParty = cpuParty.map((pokemon, i) => {
      if (i === cpuIndex) {
      return {...pokemon, currentHp: Math.max(0, pokemon.currentHp - damage) }
  }
    return pokemon
  })
  setCpuParty(updatedCpuParty)
  //once pokemon start fainting, they will swap out automatically or end the game
    if (updatedCpuParty[cpuIndex].currentHp === 0) {
      if (cpuIndex + 1 >= cpuParty.length) {
        setPhase("game-over")
        navigate('/result')
      } else {
        setCpuIndex(cpuIndex + 1)
      }
    } else {
      setPhase("cpu-turn")
      //makes the damage take a second before it happens, feels more natural
      setTimeout(() => {
        cpuAttack()
      }, 1000)
    }
}

const cpuAttack = () => {
  const multiplier = getMultiplier(cpuPokemon.type, playerPokemon.type)
  const damage = Math.round(cpuPokemon.attack * multiplier)

  const updatedPlayerParty = playerParty.map((pokemon, i) => {
    if (i === playerIndex) {
      return {...pokemon, currentHp: Math.max(0, pokemon.currentHp - damage) }
    }
    return pokemon
  })
  setPlayerParty(updatedPlayerParty)
    if (updatedPlayerParty[playerIndex].currentHp === 0) {
      if (playerIndex + 1 >= playerParty.length) {
        setPhase("game-over")
        navigate('/result')
      } else {
        setPlayerIndex(playerIndex + 1)
      } 
    } else {
      setPhase("player-turn")
    }
}

  return (
  <>
    <>
    <h1>{cpuPokemon.name} [{cpuPokemon.type}]</h1>
    <p>HP: {cpuPokemon.currentHp} / {cpuPokemon.maxHp}</p>
    <img src={cpuPokemon.sprite} alt={playerPokemon.name}/>
    </>

    <>
    <h1>{playerPokemon.name} [{playerPokemon.type}]</h1>
    <p>HP: {playerPokemon.currentHp} / {playerPokemon.maxHp}</p>
    <img src={playerPokemon.sprite} alt={playerPokemon.name}/>
    </>

    {phase === "player-turn" && (
      <>
        {playerPokemon.moves.map((move, i) => (
          <button key={i} onClick={() => playerAttack(i)}>
            {move}
          </button>
        ))}
      </>
    )}
    {phase === "cpu-turn" && <p>CPU is making their move.</p>}
  </>
  )
}

export default Battle
