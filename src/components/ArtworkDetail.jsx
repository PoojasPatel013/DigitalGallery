import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Heart, Share2, Download, Info } from 'lucide-react'
import { Button } from "./ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs"

const ArtworkDetail = () => {
  const { id } = useParams()
  const [artwork, setArtwork] = useState(null)
  const [similarArtworks, setSimilarArtworks] = useState([])

  useEffect(() => {
    const fetchArtwork = async () => {
      // Replace with actual API call
      const mockArtwork = {
        id: Number.parseInt(id),
        title: "Digital Dreams",
        artist: "Pooja Patel",
        year: "2024",
        medium: "Digital Art",
        collection: "Abstract Expressionism",
        dimensions: "3000 x 4500 px",
        description: "A mesmerizing journey through a digital landscape, where reality and imagination intertwine.",
        artistStatement: "This piece explores the intersection of consciousness and digital reality, drawing inspiration from both traditional abstract expressionism and modern digital techniques.",
        image: `https://picsum.photos/seed/art${id}/800/1200`,
        artistImage: "https://picsum.photos/seed/artist/400/400",
        artistBio: "Pooja Patel is a digital artist known for her innovative approach to combining traditional art concepts with cutting-edge digital techniques. With over a decade of experience in digital art, her work has been featured in numerous virtual galleries worldwide.",
        price: "$2,500",
        likes: 1234,
      }
      setArtwork(mockArtwork)
    }

    fetchArtwork()
  }, [id])

  useEffect(() => {
    if (artwork) {
      const fetchSimilarArtworks = async () => {
        const mockSimilarArtworks = Array(6).fill().map((_, index) => ({
          id: 100 + index,
          title: `Similar Work ${index + 1}`,
          artist: "Emma Watson",
          image: `https://picsum.photos/seed/similar${index}/400/600`,
          price: "$2,000",
        }))
        setSimilarArtworks(mockSimilarArtworks)
      }
      fetchSimilarArtworks()
    }
  }, [artwork])

  if (!artwork) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column - Artwork Image */}
        <div className="lg:w-2/3">
          <div className="relative group">
            <img
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Artwork Details */}
        <div className="lg:w-1/3">
          <h1 className="text-4xl font-bold mb-2">{artwork.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <img
              src={artwork.artistImage || "/placeholder.svg"}
              alt={artwork.artist}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{artwork.artist}</h2>
              <p className="text-gray-400">{artwork.collection}</p>
            </div>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="artist">Artist</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-gray-400">Year</p>
                  <p className="font-semibold">{artwork.year}</p>
                </div>
                <div>
                  <p className="text-gray-400">Medium</p>
                  <p className="font-semibold">{artwork.medium}</p>
                </div>
                <div>
                  <p className="text-gray-400">Dimensions</p>
                  <p className="font-semibold">{artwork.dimensions}</p>
                </div>
                <div>
                  <p className="text-gray-400">Price</p>
                  <p className="font-semibold">{artwork.price}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="description">
              <div className="mt-4 space-y-4">
                <p>{artwork.description}</p>
                <p className="text-gray-400">{artwork.artistStatement}</p>
              </div>
            </TabsContent>
            <TabsContent value="artist">
              <div className="mt-4">
                <p>{artwork.artistBio}</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 mt-8">
            <Button className="flex-1">Purchase Now</Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 p-4 bg-gray-900 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400">
              <Info className="h-4 w-4" />
              <span className="text-sm">
                This artwork is part of the {artwork.collection} collection
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Artworks */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8">More from this Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {similarArtworks.map((similarArtwork) => (
            <motion.div
              key={similarArtwork.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={`/artwork/${similarArtwork.id}`} className="block">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <img
                    src={similarArtwork.image || "/placeholder.svg"}
                    alt={similarArtwork.title}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{similarArtwork.title}</h3>
                    <p className="text-gray-400">{similarArtwork.artist}</p>
                    <p className="text-gray-300 mt-2">{similarArtwork.price}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArtworkDetail
