import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import './Battle.css'

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
  const sprite = data.sprites.versions["generation-v"]["black-white"].animated.front_default
  //const sprite = data.sprites.front_default
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
  const location = useLocation()
  const [playerAnimation, setPlayerAnimation] = useState(null)
  const [cpuAnimation, setCpuAnimation] = useState(null)
  const [damagePopup, setDamagePopup] = useState(null)
  const [moveAnnouncement, setMoveAnnouncement] = useState(null)
  //loads teams
  useEffect(() => {
    const loadTeams = async () => {
      const cpuIds = getRandomIds(3)
      const cpuTeam = await Promise.all(cpuIds.map(id => fetchPokemon(id)))
      setCpuParty(cpuTeam)

      const passedTeam = location.state?.team
      if (passedTeam && passedTeam.length > 0) {
        const fullTeam = await Promise.all(passedTeam.map(p => fetchPokemon(p.name)))
        setPlayerParty(fullTeam)
      } else {
        const playerIds = getRandomIds(3)
        const playerTeam = await Promise.all(playerIds.map(id => fetchPokemon(id)))
        setPlayerParty(playerTeam)
      }
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
    setPhase("announcing")
    setMoveAnnouncement(`${playerPokemon.name} used ${playerPokemon.moves[moveIndex]}!`)

    setTimeout(() => {
      setMoveAnnouncement(null)
      setPlayerAnimation("attack")
      setTimeout(() => setCpuAnimation("hit"), 300)
      const multiplier = getMultiplier(playerPokemon.type, cpuPokemon.type)
      const damage = Math.round((playerPokemon.attack * multiplier)/5)
      setDamagePopup({target: "cpu", amount: damage})

      const updatedCpuParty = cpuParty.map((pokemon, i) => {
        if (i === cpuIndex) {
          return {...pokemon, currentHp: Math.max(0, pokemon.currentHp - damage) }
        }
        return pokemon
      })
      setCpuParty(updatedCpuParty)

      if (updatedCpuParty[cpuIndex].currentHp === 0) {
        setMoveAnnouncement(`${cpuPokemon.name} fainted!`)
        if (cpuIndex + 1 >= cpuParty.length) {
          setTimeout(() => {
            setMoveAnnouncement(null)
            setPhase("game-over")
            navigate('/result', { state: { won: true } })
          }, 1500)
        } else {
          setTimeout(() => {
            setMoveAnnouncement(null)
            setCpuIndex(cpuIndex + 1)
            setTimeout(() => cpuAttack(cpuParty[cpuIndex + 1]), 1000)
          }, 1500)
        }
      } else {
        setTimeout(() => cpuAttack(), 1000)
      }
    }, 1000)
  }

const cpuAttack = (activeCpuPokemon = cpuPokemon) => {
  const cpuMoveIndex = Math.floor(Math.random() * activeCpuPokemon.moves.length)
  setMoveAnnouncement(`${activeCpuPokemon.name} used ${activeCpuPokemon.moves[cpuMoveIndex]}!`)
  setPhase("announcing")

  setTimeout(() => {
    setMoveAnnouncement(null)
    const multiplier = getMultiplier(activeCpuPokemon.type, playerPokemon.type)
    const damage = Math.round((activeCpuPokemon.attack * multiplier)/5)
    setCpuAnimation("attack")
    setTimeout(() => setPlayerAnimation("hit"), 300)
    setDamagePopup({target: "player", amount: damage})

    const updatedPlayerParty = playerParty.map((pokemon, i) => {
      if (i === playerIndex) {
        return {...pokemon, currentHp: Math.max(0, pokemon.currentHp - damage) }
      }
      return pokemon
    })
    setPlayerParty(updatedPlayerParty)

    if (updatedPlayerParty[playerIndex].currentHp === 0) {
      setMoveAnnouncement(`${playerPokemon.name} fainted!`)
      if (playerIndex + 1 >= playerParty.length) {
        setTimeout(() => {
          setMoveAnnouncement(null)
          setPhase("game-over")
          navigate('/result', { state: { won: false } })
        }, 1500)
      } else {
        setTimeout(() => {
          setMoveAnnouncement(null)
          setPlayerIndex(playerIndex + 1)
          setPhase("player-turn")
        }, 1500)
      }
    } else {
      setPhase("player-turn")
    }
  }, 1000)
}

  return (
  <>
    <div className="battle-arena pixelated-image">
      <div
      className={`cpu-pokemon ${cpuAnimation || ""}`}
      onAnimationEnd={() => setCpuAnimation(null)}
    >
      {damagePopup?.target === "cpu" && (
        <span className="damage-popup" onAnimationEnd={() => setDamagePopup(null)}>
          -{damagePopup.amount}
        </span>
      )}
      <div className="pokemoninfo">
        <h1 className="pokemonname">{cpuPokemon.name} [{cpuPokemon.type}]</h1>
        <div className="health-bar-bg">
          <div className="health-bar" style={{width: `${(cpuPokemon.currentHp / cpuPokemon.maxHp) * 100}%`}}></div>
        </div>
        <p className="hptext">HP: {cpuPokemon.currentHp} / {cpuPokemon.maxHp}</p>
        </div>
        <img className="pokemonimg" src={cpuPokemon.sprite} alt={cpuPokemon.name}/>
        <div className="pokeballs">
          {cpuParty.map((p, i) => (
            <span key={i}>{p.currentHp === 0 ? '⚫️' : '🔴'}</span>
          ))}
        </div>
      </div>

      <div
        className={`player-pokemon ${playerAnimation || ""}`}
        onAnimationEnd={() => setPlayerAnimation(null)}
      >
        {damagePopup?.target === "player" && (
          <span className="damage-popup" onAnimationEnd={() => setDamagePopup(null)}>
            -{damagePopup.amount}
          </span>
        )}
        <div class="pokemoninfo">
        <h1 class="pokemonname">{playerPokemon.name} [{playerPokemon.type}]</h1>
        
        <div className="health-bar-bg">
          <div className="health-bar" style={{width: `${(playerPokemon.currentHp / playerPokemon.maxHp) * 100}%`}}></div>
        </div>
        <p class="hptext">HP: {playerPokemon.currentHp} / {playerPokemon.maxHp}</p>
        </div>
        <img class="pokemonimg" src={playerPokemon.sprite} alt={playerPokemon.name}/>
        <div className="pokeballs">
          {playerParty.map((p, i) => (
            <span key={i}>{p.currentHp === 0 ? '⚫️' : '🔴'}</span>
          ))}
        </div>
      </div>
    </div>

    {moveAnnouncement && (
      <div className="move-announcement">
        <p>{moveAnnouncement}</p>
      </div>
    )}

    {phase === "player-turn" && (
      <div id="moves">
        {playerPokemon.moves.map((move, i) => (
          <button key={i} onClick={() => playerAttack(i)}>
            {move}
          </button>
        ))}
      </div>
    )}
  </>
  )
}

export default Battle
