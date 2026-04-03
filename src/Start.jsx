import { Link } from 'react-router-dom';

function Start() {

  return (
    <>
    <img className="pixelated-image" src="/src/assets/start bg.png" />
      <h1>start screen</h1>
      <Link to="/team"><button>start</button></Link>
    </>
  )
}

export default Start
