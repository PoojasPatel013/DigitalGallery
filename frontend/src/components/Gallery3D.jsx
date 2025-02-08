// import { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { useParams } from "react-router-dom";

// const Gallery3D = () => {
//   const mountRef = useRef(null);
//   const { id } = useParams();
//   const [artworks, setArtworks] = useState([]);

//   useEffect(() => {
//     const fetchArtworks = async () => {
//       const mockArtworks = Array(10).fill().map((_, index) => ({
//         id: index + 1,
//         title: `Artwork ${index + 1}`,
//         artist: `Artist ${index + 1}`,
//         image: `https://picsum.photos/seed/art${index + 1}/512/512`,
//       }));
//       setArtworks(mockArtworks);
//     };
//     fetchArtworks();
//   }, []);

//   useEffect(() => {
//     if (artworks.length === 0) return;

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x1a1a1a);

//     const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
//     camera.position.set(0, 2, 5);

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     renderer.shadowMap.enabled = true;
//     mountRef.current.appendChild(renderer.domElement);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//     scene.add(ambientLight);

//     const spotlight = new THREE.SpotLight(0xffffff, 1.2);
//     spotlight.position.set(0, 10, 5);
//     spotlight.angle = Math.PI / 4;
//     spotlight.penumbra = 0.3;
//     spotlight.castShadow = true;
//     scene.add(spotlight);

//     const floor = new THREE.Mesh(
//       new THREE.PlaneGeometry(50, 20),
//       new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 })
//     );
//     floor.rotation.x = -Math.PI / 2;
//     floor.receiveShadow = true;
//     scene.add(floor);

//     const loader = new THREE.TextureLoader();
//     const artworkGroup = new THREE.Group();
    
//     artworks.forEach((artwork, index) => {
//       const frame = new THREE.Mesh(
//         new THREE.BoxGeometry(3, 2, 0.1),
//         new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.5 })
//       );
//       frame.position.set(index * 4 - 10, 3, -5);
//       artworkGroup.add(frame);

//       loader.load(artwork.image, (texture) => {
//         const artMaterial = new THREE.MeshBasicMaterial({ map: texture });
//         const art = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.8), artMaterial);
//         art.position.set(index * 4 - 10, 3, -4.9);
//         artworkGroup.add(art);
//       });
//     });

//     scene.add(artworkGroup);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;
//     controls.maxPolarAngle = Math.PI / 2;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       mountRef.current.removeChild(renderer.domElement);
//       scene.traverse((object) => {
//         if (object.isMesh) {
//           object.geometry.dispose();
//           if (object.material.map) object.material.map.dispose();
//           object.material.dispose();
//         }
//       });
//       renderer.dispose();
//     };
//   }, [artworks]);

//   return <div ref={mountRef} className="w-full h-screen" />;
// };

// export default Gallery3D;


import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useParams } from "react-router-dom";

const Gallery3D = () => {
  const mountRef = useRef(null);
  const { id } = useParams();
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      const mockArtworks = Array(10).fill().map((_, index) => ({
        id: index + 1,
        title: `Artwork ${index + 1}`,
        artist: `Artist ${index + 1}`,
        image: `https://picsum.photos/seed/art${index + 1}/512/512`,
      }));
      setArtworks(mockArtworks);
    };
    fetchArtworks();
  }, []);

  useEffect(() => {
    if (artworks.length === 0) return;

    const scene = new THREE.Scene();
    
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load("https://t4.ftcdn.net/jpg/04/36/44/01/360_F_436440114_olc8oi06npMjovzw61jaqKqn8a5OcyaH.jpg");
    scene.background = backgroundTexture;

    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const spotlight = new THREE.SpotLight(0xffffff, 1.2);
    spotlight.position.set(0, 10, 5);
    spotlight.angle = Math.PI / 4;
    spotlight.penumbra = 0.3;
    spotlight.castShadow = true;
    scene.add(spotlight);

    const loader = new THREE.TextureLoader();
    const artworkGroup = new THREE.Group();
    
    artworks.forEach((artwork, index) => {
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.5 })
      );
      frame.position.set(index * 4 - 10, 3, -5);
      artworkGroup.add(frame);

      loader.load(artwork.image, (texture) => {
        const artMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const art = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.8), artMaterial);
        art.position.set(index * 4 - 10, 3, -4.9);
        artworkGroup.add(art);
      });
    });

    scene.add(artworkGroup);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 2;
    controls.maxDistance = 20;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [artworks]);

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default Gallery3D;
