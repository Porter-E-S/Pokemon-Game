import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Start from './Start.jsx'
import SelectTeam from './SelectTeam.jsx'
import Battle from './Battle.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <p>app</p>
    <nav>
      links for testing:{" "}
        <Link to="/">Home</Link> |{" "}
        <Link to="/team">SelectTeam</Link> |{" "}
        <Link to="/battle">Battle</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/team" element={<SelectTeam />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
