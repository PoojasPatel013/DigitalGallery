import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Gallery = () => {
  const [collections, setCollections] = useState([])

  useEffect(() => {
    // Fetch collections from an API or load from a local data source
    const fetchCollections = async () => {
      // Replace this with actual API call
      const mockCollections = [
        { id: 1, name: "Abstract Expressionism", image: "https://picsum.photos/seed/abstract/400/300" },
        { id: 2, name: "Digital Surrealism", image: "https://picsum.photos/seed/surreal/400/300" },
        { id: 3, name: "Pixel Art", image: "https://picsum.photos/seed/pixel/400/300" },
        { id: 4, name: "Cyberpunk", image: "https://picsum.photos/seed/cyber/400/300" },
        { id: 5, name: "Pop Art", image: "https://picsum.photos/seed/pop/400/300" },
      ]
      setCollections(mockCollections)
    }

    fetchCollections()
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Digital Art Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {collections.map((collection) => (
          <motion.div key={collection.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to={`/collection/${collection.id}`} className="block">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{collection.name}</h2>
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

