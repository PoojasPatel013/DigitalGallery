import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Gallery from "./components/Gallery"
import ArtworkDetail from "./components/ArtworkDetail"
import About from "./components/About"
import Contact from "./components/Contact"
import Collection from "./components/Collection"
import Gallery3D from "./components/Gallery3D"
import Tickets from "./components/Tickets"
import TabExample from "./components/TabExample"

function App() {
  return (
    <Router>
      <div className="App bg-black text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection/:id" element={<Collection />} />
          <Route path="/gallery3d/:id" element={<Gallery3D />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path = "/tab-example" element={<TabExample/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App

