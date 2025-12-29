"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  className?: string;
}

export default function Diamond3D({ className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const isDisposedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    isDisposedRef.current = false;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 4);
    camera.lookAt(0, 0, 0);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      console.warn("WebGL not available for Diamond3D");
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create diamond geometry (brilliant cut approximation)
    const createDiamondGeometry = () => {
      const vertices: number[] = [];
      const indices: number[] = [];

      // Diamond proportions
      const crownHeight = 0.35;
      const pavilionDepth = 0.8;
      const tableRadius = 0.5;
      const girdleRadius = 1.0;
      const culetPoint = -pavilionDepth;

      // Crown vertices (top)
      const tableY = crownHeight;

      // Table (top flat surface) - 8 vertices
      const tableSides = 8;
      const tableVerts: number[] = [];
      for (let i = 0; i < tableSides; i++) {
        const angle = (i / tableSides) * Math.PI * 2;
        tableVerts.push(
          Math.cos(angle) * tableRadius,
          tableY,
          Math.sin(angle) * tableRadius
        );
      }

      // Girdle vertices - 16 vertices for more detail
      const girdleSides = 16;
      const girdleVerts: number[] = [];
      for (let i = 0; i < girdleSides; i++) {
        const angle = (i / girdleSides) * Math.PI * 2;
        girdleVerts.push(
          Math.cos(angle) * girdleRadius,
          0,
          Math.sin(angle) * girdleRadius
        );
      }

      // Build geometry manually
      // Table center
      vertices.push(0, tableY, 0); // index 0

      // Table rim
      for (let i = 0; i < tableSides; i++) {
        vertices.push(tableVerts[i * 3], tableVerts[i * 3 + 1], tableVerts[i * 3 + 2]);
      }
      // indices 1-8

      // Girdle
      for (let i = 0; i < girdleSides; i++) {
        vertices.push(girdleVerts[i * 3], girdleVerts[i * 3 + 1], girdleVerts[i * 3 + 2]);
      }
      // indices 9-24

      // Culet (bottom point)
      vertices.push(0, culetPoint, 0); // index 25

      // Table faces (center to rim)
      for (let i = 0; i < tableSides; i++) {
        const next = (i + 1) % tableSides;
        indices.push(0, i + 1, next + 1);
      }

      // Crown faces (table rim to girdle)
      for (let i = 0; i < tableSides; i++) {
        const tableIdx = i + 1;
        const nextTableIdx = (i + 1) % tableSides + 1;
        const girdleIdx1 = 9 + (i * 2) % girdleSides;
        const girdleIdx2 = 9 + (i * 2 + 1) % girdleSides;
        const girdleIdx3 = 9 + (i * 2 + 2) % girdleSides;

        // Two triangles per crown facet
        indices.push(tableIdx, girdleIdx1, girdleIdx2);
        indices.push(tableIdx, girdleIdx2, nextTableIdx);
        indices.push(nextTableIdx, girdleIdx2, girdleIdx3);
      }

      // Pavilion faces (girdle to culet)
      const culetIdx = 25;
      for (let i = 0; i < girdleSides; i++) {
        const girdleIdx = 9 + i;
        const nextGirdleIdx = 9 + (i + 1) % girdleSides;
        indices.push(girdleIdx, culetIdx, nextGirdleIdx);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();

      return geometry;
    };

    // Diamond material - glass-like with high refraction
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.95,
      thickness: 1.5,
      ior: 2.417, // Diamond's index of refraction
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      envMapIntensity: 3.0,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });

    // Create environment map for reflections
    let cubeRenderTarget: THREE.WebGLCubeRenderTarget | null = null;
    let envMaterial: THREE.ShaderMaterial | null = null;
    let envGeometry: THREE.SphereGeometry | null = null;
    
    try {
      cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
      cubeRenderTarget.texture.type = THREE.HalfFloatType;
      
      // Create a simple gradient environment
      const envScene = new THREE.Scene();
      envGeometry = new THREE.SphereGeometry(50, 32, 32);
      envMaterial = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: {
          topColor: { value: new THREE.Color(0xffd700) },
          bottomColor: { value: new THREE.Color(0xff8c00) },
          offset: { value: 10 },
          exponent: { value: 0.6 },
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          uniform float offset;
          uniform float exponent;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition + offset).y;
            float t = pow(max(h, 0.0), exponent);
            vec3 color = mix(bottomColor, topColor, t);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });
      envScene.add(new THREE.Mesh(envGeometry, envMaterial));

      // Generate environment map
      const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
      cubeCamera.update(renderer, envScene);
      diamondMaterial.envMap = cubeRenderTarget.texture;
    } catch (e) {
      console.warn("Could not create environment map:", e);
    }

    // Create diamond mesh
    const diamondGeometry = createDiamondGeometry();
    const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
    diamond.scale.setScalar(0.8);
    scene.add(diamond);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Key light - warm golden
    const keyLight = new THREE.DirectionalLight(0xffd700, 2);
    keyLight.position.set(2, 3, 2);
    scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffa500, 1);
    fillLight.position.set(-2, 1, 2);
    scene.add(fillLight);

    // Back light for rim
    const backLight = new THREE.DirectionalLight(0xffffff, 1.5);
    backLight.position.set(0, 2, -3);
    scene.add(backLight);

    // Animation - just rotate
    const animate = () => {
      if (isDisposedRef.current) return;
      
      animationIdRef.current = requestAnimationFrame(animate);

      // Simple rotation
      diamond.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || isDisposedRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      isDisposedRef.current = true;
      window.removeEventListener("resize", handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      
      // Dispose geometries and materials
      diamondGeometry.dispose();
      diamondMaterial.dispose();
      
      if (envGeometry) envGeometry.dispose();
      if (envMaterial) envMaterial.dispose();
      if (cubeRenderTarget) {
        try {
          cubeRenderTarget.dispose();
        } catch {
          // Ignore disposal errors
        }
      }
      
      // Remove renderer
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
    />
  );
}
