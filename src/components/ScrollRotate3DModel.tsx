"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  modelPath: string;
  scrollContainer?: string;
  rotationRange?: number;
  className?: string;
  enableInteraction?: boolean;
}

export default function ScrollRotate3DModel({
  modelPath,
  scrollContainer = ".scroll-content",
  rotationRange = Math.PI * 2,
  className = "",
  enableInteraction = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  
  // Interaction state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  // Start at 45 degrees left (negative Y rotation)
  const initialRotationY = -Math.PI / 4;
  const targetRotation = useRef({ x: 0, y: initialRotationY });
  const currentRotation = useRef({ x: 0, y: initialRotationY });
  const scrollRotationY = useRef(initialRotationY);
  // Track if user has manually rotated (pauses auto-rotate until scroll)
  const userHasInteracted = useRef(false);
  // Auto-rotation oscillation settings
  const autoRotateSpeed = 0.003; // Speed of oscillation
  const autoRotateMin = -Math.PI / 4; // -45 degrees
  const autoRotateMax = Math.PI / 4;  // +45 degrees
  const autoRotateDirection = useRef(1); // 1 = towards max, -1 = towards min
  // Track last scroll update time to know if actively scrolling
  const lastScrollTime = useRef(0);

  const handleResize = useCallback(() => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    
    console.log("Container dimensions:", { width, height });

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - positioned to see full model during rotation
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.3, 4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    // Transparent background
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // Main key light from front
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(0, 2, 8);
    scene.add(keyLight);

    // Fill light from front-left
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 1, 5);
    scene.add(fillLight);

    // Fill light from front-right
    const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight2.position.set(5, 0, 5);
    scene.add(fillLight2);

    // Top light for definition
    const topLight = new THREE.DirectionalLight(0xffffff, 0.4);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Center model at origin
        model.position.sub(center);
        
        // Scale to fit view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.setScalar(scale);
        
        // Keep original materials but adjust color to white
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.material) {
              // Clone the material to avoid modifying shared materials
              if (Array.isArray(child.material)) {
                child.material = child.material.map((mat) => {
                  const clonedMat = mat.clone();
                  if (clonedMat instanceof THREE.MeshStandardMaterial || 
                      clonedMat instanceof THREE.MeshPhysicalMaterial) {
                    clonedMat.color.setHex(0xffffff);
                    clonedMat.needsUpdate = true;
                  }
                  return clonedMat;
                });
              } else {
                const clonedMat = child.material.clone();
                if (clonedMat instanceof THREE.MeshStandardMaterial || 
                    clonedMat instanceof THREE.MeshPhysicalMaterial) {
                  clonedMat.color.setHex(0xffffff);
                  clonedMat.needsUpdate = true;
                }
                child.material = clonedMat;
              }
            }
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Create a group for rotation
        const group = new THREE.Group();
        group.add(model);
        scene.add(group);
        modelRef.current = group;
        
        console.log("Model loaded successfully:", { 
          size: size, 
          scale: scale,
          maxDim: maxDim 
        });

        // Setup scroll-based rotation with GSAP
        const scrollTarget = document.querySelector(scrollContainer);
        if (scrollTarget) {
          scrollTriggerRef.current = ScrollTrigger.create({
            trigger: scrollTarget,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              // Track scroll time and reset interaction flag
              lastScrollTime.current = Date.now();
              userHasInteracted.current = false;
              
              // Add initial offset to scroll rotation
              scrollRotationY.current = initialRotationY + self.progress * rotationRange;
              if (!isDragging.current) {
                targetRotation.current.y = scrollRotationY.current;
                // Smoothly reset vertical tilt when scrolling
                targetRotation.current.x *= 0.95;
              }
            },
          });
        }
      },
      (progress) => {
        // Loading progress
        const percent = (progress.loaded / progress.total) * 100;
        console.log(`Loading model: ${percent.toFixed(0)}%`);
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (modelRef.current) {
        const now = Date.now();
        const timeSinceScroll = now - lastScrollTime.current;
        const isActivelyScrolling = timeSinceScroll < 150; // Consider scrolling if < 150ms since last update
        
        // Add oscillating rotation when:
        // - Not dragging
        // - Not actively scrolling
        // - User hasn't manually rotated (or scroll has reset the flag)
        if (!isDragging.current && !isActivelyScrolling && !userHasInteracted.current) {
          targetRotation.current.y += autoRotateSpeed * autoRotateDirection.current;
          
          // Reverse direction when hitting bounds
          if (targetRotation.current.y >= autoRotateMax) {
            targetRotation.current.y = autoRotateMax;
            autoRotateDirection.current = -1;
          } else if (targetRotation.current.y <= autoRotateMin) {
            targetRotation.current.y = autoRotateMin;
            autoRotateDirection.current = 1;
          }
        }
        
        // Smooth interpolation for rotation
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.1;
        
        modelRef.current.rotation.x = currentRotation.current.x;
        modelRef.current.rotation.y = currentRotation.current.y;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Interaction handlers
    const handleMouseDown = (e: MouseEvent) => {
      if (!enableInteraction) return;
      isDragging.current = true;
      userHasInteracted.current = true; // Stop auto-rotation
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !enableInteraction) return;

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.01;
      targetRotation.current.x += deltaY * 0.005;
      
      // Clamp vertical rotation
      targetRotation.current.x = Math.max(-0.5, Math.min(0.5, targetRotation.current.x));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      container.style.cursor = enableInteraction ? "grab" : "default";
      // Don't reset rotation - keep where user left it until scroll
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!enableInteraction || e.touches.length !== 1) return;
      isDragging.current = true;
      userHasInteracted.current = true; // Stop auto-rotation
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !enableInteraction || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.01;
      targetRotation.current.x += deltaY * 0.005;
      targetRotation.current.x = Math.max(-0.5, Math.min(0.5, targetRotation.current.x));

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      // Don't reset rotation - keep where user left it until scroll
    };

    // Add event listeners
    window.addEventListener("resize", handleResize);
    
    if (enableInteraction) {
      container.style.cursor = "grab";
      container.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      
      if (enableInteraction) {
        container.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      }

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === scrollContainer) {
          trigger.kill();
        }
      });

      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      }

      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose());
            } else {
              object.material?.dispose();
            }
          }
        });
      }
    };
  }, [modelPath, scrollContainer, rotationRange, handleResize, enableInteraction]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{ touchAction: enableInteraction ? "none" : "auto" }}
    />
  );
}

