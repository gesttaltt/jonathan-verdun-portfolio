import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

// vertexShader: Calculates P-adic valuation and displacement
const vertexShader = `
    uniform float time;
    uniform vec2 mouse; // Proximity to mouse
    varying vec2 vUv;
    varying float vDisplacement;
    varying float vPulse;
    varying float vPadicResonance;

    // Simplex noise function (Standard)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                        dot(p2,x2), dot(p3,x3) ) );
    }

    // Pseudo-Padic valuation function
    // Returns a value based on divisibility of coordinate hashes by 2 (or 3, 5 etc simulated)
    float padicValuation(vec3 pos) {
        float h = fract(sin(dot(pos.xy, vec2(12.9898, 78.233))) * 43758.5453);
        // Simulate ultrametric levels: 0.25, 0.5, 0.75, 1.0
        float level = floor(h * 4.0) / 4.0; 
        return level;
    }

    void main() {
        vUv = uv;
        
        // Base Noise
        float noise = snoise(vec3(position.x * 0.5, position.y * 0.5, time * 0.2));
        vDisplacement = noise;

        // Data Pulse logic
        float pulseNoise = snoise(vec3(position.x * 2.0, position.y * 2.0, time * 2.0));
        vPulse = step(0.8, pulseNoise);
        
        // P-adic Interaction Calculation
        float dist = distance(uv, mouse); // Euclidean distance (interaction zone)
        float padicLevel = padicValuation(position);
        
        // Key Logic: "Resonance" happens if you are close to mouse AND you belong to a specific 
        // number-theoretic class (simulated by padicLevel).
        // This causes "striping" or "fractal clustering" inside the hover zone.
        float hoverStrength = smoothstep(0.4, 0.0, dist);
        
        // We modulate the resonance by time so different "prime levels" light up
        float primeModulator = sin(time * 2.0 + padicLevel * 10.0); 
        vPadicResonance = hoverStrength * step(0.5, primeModulator); 

        // Repulsion is also "quantized" for a p-adic feel (jittery/stepped movement)
        vec3 interactionDir = normalize(position); // Push out from center
        float steppedRepulsion = floor(hoverStrength * 5.0) / 5.0; // Quantized repulsion
        
        vec3 newPos = position + normal * (noise * 0.5 + steppedRepulsion * 2.0);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        
        // Size scales with resonance
        gl_PointSize = (8.0 + noise * 4.0 + vPulse * 15.0 + vPadicResonance * 10.0) * (1.0 / -gl_Position.z);
    }
`

const fragmentShader = `
    uniform float time;
    uniform vec3 color;
    uniform vec3 hoverColor;
    varying float vDisplacement;
    varying float vPulse;
    varying float vPadicResonance;
    varying vec2 vUv;

    void main() {
        // Soft circular particle
        float r = distance(gl_PointCoord, vec2(0.5));
        if (r > 0.5) discard;
        
        // Glow from center
        float glow = 1.0 - (r * 2.0);
        glow = pow(glow, 1.5);
        
        // Base Color Mixing
        vec3 baseColor = mix(color, hoverColor, vDisplacement * 0.5 + 0.5);
        
        // P-adic Highlight: Resonating particles turn Bright Cyan/White
        vec3 resonanceColor = mix(baseColor, vec3(0.8, 1.0, 1.0), vPadicResonance);
        
        // Pulse Effect
        vec3 finalColor = mix(resonanceColor, vec3(1.0, 1.0, 1.0), vPulse * 0.8);
        
        // Alpha/Brightness boost from resonance - REDUCED BASE OPACITY FURTHER
        float finalAlpha = glow * (0.15 + vPulse * 0.8 + vPadicResonance * 1.0);

        gl_FragColor = vec4(finalColor, finalAlpha);
    }
`

const TopologyMesh: React.FC<{ quality: number }> = ({ quality }) => {
  const meshRef = useRef<THREE.Points>(null)

  // Get colors from CSS variables
  const [nodeColor, setNodeColor] = useState(new THREE.Color('#3b82f6'))
  const [hoverColor, setHoverColor] = useState(new THREE.Color('#8b5cf6'))

  useEffect(() => {
    const style = getComputedStyle(document.documentElement)
    // eslint-disable-next-line
    setNodeColor(new THREE.Color(style.getPropertyValue('--node-color').trim() || '#3b82f6'))

    setHoverColor(new THREE.Color(style.getPropertyValue('--interaction-glow').trim() || '#8b5cf6'))
  }, [])

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      color: { value: nodeColor },
      hoverColor: { value: hoverColor },
    }),
    [nodeColor, hoverColor]
  )

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.time.value = state.clock.getElapsedTime()

      // Map mouse to UV space (0..1)
      const uvMouse = new THREE.Vector2((state.mouse.x + 1) / 2, (state.mouse.y + 1) / 2)
      material.uniforms.mouse.value.lerp(uvMouse, 0.1)

      // Deep Drift
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  const geometry = useMemo(() => {
    const detail = quality > 0.8 ? 16 : 8
    const geom = new THREE.IcosahedronGeometry(4, detail)
    return geom
  }, [quality])

  return (
    <points ref={meshRef}>
      <primitive object={geometry} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export const InteractiveTopology: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#050510]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
      >
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
            intensity={1.0}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        <TopologyMesh quality={1} />
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      ></div>
    </div>
  )
}
