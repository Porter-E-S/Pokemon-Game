import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Start from './Start.jsx'
import SelectTeam from './SelectTeam.jsx'
import Battle from './Battle.jsx'
<<<<<<< HEAD
import Error404 from './Error404.jsx'
=======
import Results from './Results.jsx'
>>>>>>> 9963c09 (finished battle screen logic and stylizing. Also added results screens with links to select team page and favorites page)
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <p>app</p>
    <nav>
      links for testing:{" "}
        <Link to="/">Home</Link> |{" "}
        <Link to="/pokemon">SelectTeam</Link> |{" "}
        <Link to="/battle">Battle</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/pokemon" element={<SelectTeam />} />
        <Route path="/battle" element={<Battle />} />
<<<<<<< HEAD
        <Route path="*" element={<Error404 />} />
=======
        <Route path="/result" element={<Results />} />
>>>>>>> 9963c09 (finished battle screen logic and stylizing. Also added results screens with links to select team page and favorites page)
      </Routes>
    </BrowserRouter>
  )
}

export default App
