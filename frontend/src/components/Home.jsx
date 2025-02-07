import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Home = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Create a gallery-like environment
    const roomGeometry = new THREE.BoxGeometry(10, 8, 10);
    const roomMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide });
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    scene.add(room);

    // Add some art frames
    const frameGeometry = new THREE.PlaneGeometry(2, 3);
    const frameMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const frame1 = new THREE.Mesh(frameGeometry, frameMaterial);
    frame1.position.set(0, 0, -4.9);
    scene.add(frame1);

    const frame2 = new THREE.Mesh(frameGeometry, frameMaterial);
    frame2.position.set(-4.9, 0, 0);
    frame2.rotation.y = Math.PI / 2;
    scene.add(frame2);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(0, 3, 0);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 5;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-screen">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Digital Art Gallery</h1>
          <p className="text-xl mb-8">Explore the world of digital art in our immersive 3D gallery</p>
          <Link
            to="/gallery"
            className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            Enter Gallery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
