import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { ShoppingCart } from 'lucide-react'

const Collection = () => {
  const { id } = useParams()
  const [collection, setCollection] = useState(null)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

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
            description: `This is a beautiful piece of ${["Abstract Expressionism", "Digital Surrealism", "Pixel Art", "Cyberpunk", "Pop Art"][id - 1]} art.`,
            price: Math.floor(Math.random() * 1000) + 500,
          })),
      }
      setCollection(mockCollection)
      setSelectedArtwork(mockCollection.artworks[0])
    }

    fetchCollection()
  }, [id])

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork)
  }

  const handlePurchase = () => {
    if (selectedArtwork) {
      console.log(`Purchasing ${selectedArtwork.title} for $${selectedArtwork.price}`)
      // Implement purchase logic here (e.g., add to cart, open modal, etc.)
    }
  }

  if (!collection || !selectedArtwork) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">{collection.name}</h1>
      <p className="text-xl text-center mb-8">{collection.description}</p>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Selected Artwork Display */}
        <div className="lg:w-2/3">
          <motion.img
            key={selectedArtwork.id}
            src={selectedArtwork.image}
            alt={selectedArtwork.title}
            className="w-full rounded-lg shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{selectedArtwork.title}</h2>
            <p className="text-gray-400">{selectedArtwork.artist}</p>
            <p className="mt-2">{selectedArtwork.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold">${selectedArtwork.price}</span>
              <Button onClick={handlePurchase}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Purchase
              </Button>
            </div>
          </div>
        </div>

        {/* Artwork Grid */}
        <div className="lg:w-1/3 grid grid-cols-2 gap-4">
          {collection.artworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleArtworkClick(artwork)}
              className="cursor-pointer"
            >
              <img
                src={artwork.image || "/placeholder.svg"}
                alt={artwork.title}
                className={`w-full h-40 object-cover rounded-lg ${
                  selectedArtwork.id === artwork.id ? 'ring-2 ring-white' : ''
                }`}
              />
            </motion.div>
          ))}
        </div>
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
