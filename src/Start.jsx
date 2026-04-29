import { Link } from 'react-router-dom';
import './Start.css';


function Start() {

  return (
    <div className="start-container">
        <Link to="/pokemon"><button className="start-btn">start</button></Link>
      </div>
  )
}

export default Start
