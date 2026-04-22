import { Link } from 'react-router-dom';

function Error404() {

  return (
    <>
    <h1>Error 404: page not found</h1>
    <Link to="/">Return to start screen</Link>
    </>
  )
}

export default Error404
