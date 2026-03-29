import { Link } from 'react-router-dom';

function Results() {
    return (
        <>
        <h1>Win or Loss</h1>
        <Link to="/team"><button>Start Another Battle?</button></Link>
        </>
    )
}

export default Results