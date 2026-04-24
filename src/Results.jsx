import { Link, useLocation } from 'react-router-dom';
import './Results.css'

function Results() {
    const location = useLocation()
    const won = location.state?.won

    return (
        <>
            <img src={won ? '/win.jpg' : '/lose.png'} alt={won ? 'You win!' : 'You lose!'} />
            <div className="results-buttons">
                <Link to="/pokemon"><button>Play again?</button></Link>
                <button>Add pokemon to favorites?</button>
            </div>
        </>
    )
}

export default Results
