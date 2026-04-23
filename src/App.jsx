import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Start from './Start.jsx'
import SelectTeam from './SelectTeam.jsx'
import Battle from './Battle.jsx'
import Error404 from './Error404.jsx'
import Results from './Results.jsx'
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
        <Route path="*" element={<Error404 />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
