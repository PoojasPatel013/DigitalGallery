import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Gallery = () => {
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    // Fetch artworks from an API or load from a local data source
    const fetchArtworks = async () => {
      // Replace this with actual API call
      const mockArtworks = [
        { id: 1, title: "Digital Dreams", artist: "Alice Wonder", image: "https://picsum.photos/seed/art1/400/600" },
        { id: 2, title: "Neon Nights", artist: "Bob Bright", image: "https://picsum.photos/seed/art2/400/600" },
        { id: 3, title: "Pixel Paradise", artist: "Charlie Crisp", image: "https://picsum.photos/seed/art3/400/600" },
        { id: 4, title: "Virtual Vistas", artist: "Diana Digital", image: "https://picsum.photos/seed/art4/400/600" },
        {
          id: 5,
          title: "Cybernetic Sunsets",
          artist: "Ethan Electric",
          image: "https://picsum.photos/seed/art5/400/600",
        },
        { id: 6, title: "Quantum Quilt", artist: "Fiona Fractal", image: "https://picsum.photos/seed/art6/400/600" },
      ]
      setArtworks(mockArtworks)
    }

    fetchArtworks()
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Digital Art Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork) => (
          <motion.div key={artwork.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to={`/artwork/${artwork.id}`} className="block">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{artwork.title}</h2>
                  <p className="text-gray-400">{artwork.artist}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Gallery

