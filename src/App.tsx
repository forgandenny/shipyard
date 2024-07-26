import { Routes, Route } from "react-router-dom"
import "./App.css"
import Layout from "./components/Layout"
import { Starships } from "./features/starship/Starships"
import { Starship } from "./features/starship/Starship"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Starships />} />
        <Route path="/starship/:id" element={<Starship />} />
      </Route>
    </Routes>
  )
}

export default App
