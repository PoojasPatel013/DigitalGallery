"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { useParams } from "react-router-dom"

const Gallery3D = () => {
  const mountRef = useRef(null)
  const { id } = useParams()
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    const fetchArtworks = async () => {
      // Replace with actual API call
      const mockArtworks = Array(15)
        .fill()
        .map((_, index) => ({
          id: index + 1,
          title: `Artwork ${index + 1}`,
          artist: `Artist ${index + 1}`,
          image: `https://picsum.photos/seed/art${index + 1}/512/512`,
        }))
      setArtworks(mockArtworks)
    }

    fetchArtworks()
  }, [])

  useEffect(() => {
    if (artworks.length === 0) return

    const currentMount = mountRef.current

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a1a)

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    currentMount.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Spotlights for artwork
    const createSpotlight = (x, y, z) => {
      const spotlight = new THREE.SpotLight(0xffffff, 1)
      spotlight.position.set(x, y, z)
      spotlight.angle = Math.PI / 6
      spotlight.penumbra = 0.1
      spotlight.decay = 2
      spotlight.distance = 50
      spotlight.castShadow = true
      return spotlight
    }

    const spotlights = [createSpotlight(0, 10, 0), createSpotlight(-10, 10, 0), createSpotlight(10, 10, 0)]
    spotlights.forEach((spotlight) => scene.add(spotlight))

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(100, 20)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.8,
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
    })
    const wallGeometry = new THREE.PlaneGeometry(100, 10)

    const backWall = new THREE.Mesh(wallGeometry, wallMaterial)
    backWall.position.set(0, 5, -10)
    backWall.receiveShadow = true
    scene.add(backWall)

    // Artwork frames
    const artworkGroups = []
    for (let i = 0; i < 5; i++) {
      const group = new THREE.Group()
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j
        if (index < artworks.length) {
          const artwork = artworks[index]

          // Frame
          const frameGeometry = new THREE.BoxGeometry(3, 2, 0.1)
          const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b4513,
            roughness: 0.5,
          })
          const frame = new THREE.Mesh(frameGeometry, frameMaterial)
          frame.position.set(j * 4 - 4, 0, 0)
          frame.castShadow = true
          group.add(frame)

          // Artwork
          const loader = new THREE.TextureLoader()
          const texture = loader.load(artwork.image)
          const artGeometry = new THREE.PlaneGeometry(2.8, 1.8)
          const artMaterial = new THREE.MeshBasicMaterial({ map: texture })
          const art = new THREE.Mesh(artGeometry, artMaterial)
          art.position.set(j * 4 - 4, 0, 0.06)
          group.add(art)

          // Spotlight for this artwork
          const artSpotlight = createSpotlight(j * 4 - 4, 5, 2)
          artSpotlight.target = art
          group.add(artSpotlight)
        }
      }
      group.position.set(0, 3, -9.5)
      scene.add(group)
      artworkGroups.push(group)
    }

    // Camera position
    camera.position.set(0, 2, 5)

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.screenSpacePanning = false
    controls.minDistance = 1
    controls.maxDistance = 50
    controls.maxPolarAngle = Math.PI / 2
    controls.target.set(0, 2, -5)

    // Animation
    let animationFrame
    const animate = () => {
      animationFrame = requestAnimationFrame(animate)
      controls.update()

      // Animate artwork groups
      const time = Date.now() * 0.001
      artworkGroups.forEach((group, index) => {
        group.position.x = Math.sin(time + (index * Math.PI) / 2.5) * 40
      })

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
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", handleResize)
      currentMount.removeChild(renderer.domElement)
    }
  }, [artworks])

  return (
    <div className="w-full h-screen">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  )
}

export default Gallery3D

