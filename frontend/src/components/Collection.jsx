import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"

const Collection = () => {
  const { id } = useParams()
  const [collection, setCollection] = useState(null)

  useEffect(() => {
    // Fetch collection details from an API or load from a local data source
    const fetchCollection = async () => {
      // Replace this with actual API call
      const mockCollection = {
        id: Number.parseInt(id),
        name: ["Abstract Expressionism", "Digital Surrealism", "Pixel Art", "Cyberpunk", "Pop Art"][id - 1],
        description: `A collection of digital artworks inspired by the ${["Abstract Expressionism", "Digital Surrealism", "Pixel Art", "Cyberpunk", "Pop Art"][id - 1]} movement.`,
        artworks: Array(9)
          .fill()
          .map((_, index) => ({
            id: index + 1,
            title: `Artwork ${index + 1}`,
            artist: `Artist ${index + 1}`,
            image: `https://picsum.photos/seed/art${id}${index + 1}/400/600`,
          })),
      }
      setCollection(mockCollection)
    }

    fetchCollection()
  }, [id])

  if (!collection) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">{collection.name}</h1>
      <p className="text-xl text-center mb-8">{collection.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collection.artworks.map((artwork) => (
          <motion.div key={artwork.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img src={artwork.image || "/placeholder.svg"} alt={artwork.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{artwork.title}</h2>
                <p className="text-gray-400">{artwork.artist}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          to={`/gallery3d/${id}`}
          className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
        >
          View in 3D Gallery
        </Link>
      </div>
    </div>
  )
}

export default Collection

