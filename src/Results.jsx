import { Link, useLocation } from 'react-router-dom';
import './Results.css'

function Results() {
    const location = useLocation()
    const won = location.state?.won

    return (
        <>
            <div class="resultcontainer">
            <h1> {won ? 'You win!' : 'You lose!'}</h1>
            <div className="results-buttons">
                <Link to="/pokemon"><button>Play again?</button></Link>
                
            </div>
            </div>
        </>
    )
}

export default Results
