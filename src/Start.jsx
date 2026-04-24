import { Link } from 'react-router-dom';
import './Start.css';


function Start() {

  return (
    <div className="start-container">
      <img className="pixelated-image" src="/src/assets/start bg.png" />
        <h1>start screen</h1>
        <Link to="/pokemon"><button className="start-btn">start</button></Link>
      </div>
  )
}

export default Start
