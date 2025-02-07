import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const ArtworkDetail = () => {
  const { id } = useParams()
  const [artwork, setArtwork] = useState(null)
  const mountRef = useRef(null)

  useEffect(() => {
    // Fetch artwork details from an API or load from a local data source
    const fetchArtwork = async () => {
      // Replace this with actual API call
      const mockArtwork = {
        id: Number.parseInt(id),
        title: "Digital Dreams",
        artist: "Alice Wonder",
        description: "A mesmerizing journey through a digital landscape, where reality and imagination intertwine.",
        image: `https://picsum.photos/seed/art${id}/800/1200`,
      }
      setArtwork(mockArtwork)
    }

    fetchArtwork()
  }, [id])

  useEffect(() => {
    if (!artwork) return

    const currentMount = mountRef.current

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    currentMount.appendChild(renderer.domElement)

    // Create a frame for the artwork
    const frameGeometry = new THREE.BoxGeometry(4, 6, 0.1)
    const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })
    const frame = new THREE.Mesh(frameGeometry, frameMaterial)
    scene.add(frame)

    // Create a plane for the artwork texture
    const loader = new THREE.TextureLoader()
    const texture = loader.load(artwork.image)
    const artGeometry = new THREE.PlaneGeometry(3.8, 5.8)
    const artMaterial = new THREE.MeshBasicMaterial({ map: texture })
    const art = new THREE.Mesh(artGeometry, artMaterial)
    art.position.z = 0.06
    scene.add(art)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const spotLight = new THREE.SpotLight(0xffffff, 0.8)
    spotLight.position.set(0, 5, 5)
    spotLight.target = frame
    scene.add(spotLight)

    // Camera position
    camera.position.z = 5

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      const width = currentMount.clientWidth
      const height = currentMount.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      currentMount.removeChild(renderer.domElement)
    }
  }, [artwork])

  if (!artwork) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div ref={mountRef} className="w-full h-[600px]" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{artwork.title}</h1>
          <h2 className="text-2xl text-gray-400 mb-4">{artwork.artist}</h2>
          <p className="text-lg mb-8">{artwork.description}</p>
          <button className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
            Add to Collection
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArtworkDetail

