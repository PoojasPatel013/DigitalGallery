import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, ShoppingCart } from "lucide-react"
import { Button } from "./ui/Button"
import { Card, CardContent } from "./ui/Card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/Carousel"

const API_URL = "http://localhost:5000/api"

const Home = () => {
  const mountRef = useRef(null)
  const [featuredArtists, setFeaturedArtists] = useState([])
  const [upcomingExhibitions, setUpcomingExhibitions] = useState([])
  const [featuredArtworks, setFeaturedArtworks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsRes, exhibitionsRes, artworksRes] = await Promise.all([
          fetch(`${API_URL}/artists`),
          fetch(`${API_URL}/exhibitions`),
          fetch(`${API_URL}/artworks`),
        ])

        const artists = await artistsRes.json()
        const exhibitions = await exhibitionsRes.json()
        const artworks = await artworksRes.json()

        setFeaturedArtists(artists)
        setUpcomingExhibitions(exhibitions)
        setFeaturedArtworks(artworks)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const handlePurchase = (artwork) => {
    console.log(`Purchasing ${artwork.title} for $${artwork.price}`)
    // Implement purchase logic here (e.g., add to cart, open modal, etc.)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
        
        <section className="relative h-screen">
         <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
         <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
           <source src="/videos/gallery-tour.mp4" type="video/mp4" />
         </video>
         <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
           <div className="max-w-2xl">
             <h1 className="text-6xl font-bold mb-6">Digital Art Gallery</h1>
             <p className="text-xl mb-8">Experience the future of art in our immersive digital gallery</p>
             <div className="flex gap-4">
               <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
                 <Link to="/gallery">Explore Gallery</Link>
               </Button>
               <Button
                 size="lg"
                 variant="outline"
                 className="border-white text-white hover:bg-white hover:text-black"
                 asChild
               >
                 <Link to="/tickets">Book Tickets</Link>
               </Button>
             </div>
           </div>
         </div>
       </section>


      {/* Purchase Artwork Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Artworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                whileHover={{ scale: 1.05 }}
                className="bg-black rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                  <p className="text-gray-400 mb-4">{artwork.artist}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${artwork.price}</span>
                    <Button className="bg-white text-black hover:bg-gray-200" onClick={() => handlePurchase(artwork)}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Purchase
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/gallery">View All Artworks</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <motion.div
                key={artist.id}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 rounded-lg overflow-hidden"
              >
                <img src={artist.image || "/placeholder.svg"} alt={artist.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{artist.name}</h3>
                  <p className="text-gray-400 mb-2">{artist.specialty}</p>
                  <p className="text-gray-300">{artist.bio}</p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link to={`/artist/${artist.id}`}>View Profile</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Exhibitions Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Exhibitions</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {upcomingExhibitions.map((exhibition) => (
                <CarouselItem key={exhibition.id}>
                  <Card className="bg-black border-gray-800">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={exhibition.image || "/placeholder.svg"}
                          alt={exhibition.title}
                          className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-bold mb-2">{exhibition.title}</h3>
                          <div className="flex flex-wrap gap-4 text-gray-300 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{exhibition.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{exhibition.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>From ${exhibition.price}</span>
                            </div>
                          </div>
                          <Button className="bg-white text-black hover:bg-gray-200" asChild>
                            <Link to={`/book/${exhibition.id}`}>Book Now</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  )
}

export default Home

