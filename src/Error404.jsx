import { Link } from 'react-router-dom';
import './App.css'

function Error404() {

    const btnstyle = {
    "font-family": "'Press Start 2P', cursive",
    "font-size": "1.5rem",
    "padding": "16px 32px",
    "margin":"0px auto",
    "cursor":"pointer"
}
  return (
    <>
    <h1>Error 404:<br />page not found</h1>
    <Link to="/" style={{color:"white"}}><button style={btnstyle}>Return to start screen</button></Link>
    </>
  )
}

export default Error404
