"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "./ui/Button"
import { Card, CardContent } from "./ui/Card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/Carousel"

const Home = () => {
  const mountRef = useRef(null)
  const [featuredArtists, setFeaturedArtists] = useState([])
  const [upcomingExhibitions, setUpcomingExhibitions] = useState([])

  useEffect(() => {
    // Fetch featured artists and upcoming exhibitions
    const fetchData = async () => {
      // Replace with actual API calls
      const mockFeaturedArtists = [
        {
          id: 1,
          name: "Elena Rodriguez",
          specialty: "Digital Surrealism",
          image: "https://picsum.photos/seed/artist1/400/400",
          bio: "Creating dreamlike digital landscapes",
        },
        {
          id: 2,
          name: "Marcus Chen",
          specialty: "Pixel Art",
          image: "https://picsum.photos/seed/artist2/400/400",
          bio: "Merging traditional pixel art with modern themes",
        },
        {
          id: 3,
          name: "Sarah Johnson",
          specialty: "Abstract Digital",
          image: "https://picsum.photos/seed/artist3/400/400",
          bio: "Exploring emotions through digital abstraction",
        },
      ]

      const mockExhibitions = [
        {
          id: 1,
          title: "Future Visions",
          date: "March 15-30, 2024",
          location: "Main Gallery Hall",
          image: "https://picsum.photos/seed/exhibit1/800/400",
          price: "$25",
        },
        {
          id: 2,
          title: "Digital Dreams",
          date: "April 5-20, 2024",
          location: "East Wing",
          image: "https://picsum.photos/seed/exhibit2/800/400",
          price: "$30",
        },
        {
          id: 3,
          title: "Pixel Perfect",
          date: "May 1-15, 2024",
          location: "West Wing",
          image: "https://picsum.photos/seed/exhibit3/800/400",
          price: "$20",
        },
      ]

      setFeaturedArtists(mockFeaturedArtists)
      setUpcomingExhibitions(mockExhibitions)
    }

    fetchData()
  }, [])

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
                              <span>From {exhibition.price}</span>
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

