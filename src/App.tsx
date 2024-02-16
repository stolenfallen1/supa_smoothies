import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/update" element={<Update />} />
    </Routes>
  )
}

export default App
