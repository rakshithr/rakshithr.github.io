import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const NODES = [
  { pos: [0, 0, 0], color: "#ff9e2c", label: "Supervisor" },
  { pos: [-1.8, 1.2, 0], color: "#00e5ff", label: "RAG" },
  { pos: [1.8, 1.2, 0], color: "#00e5ff", label: "Retrieve" },
  { pos: [-1.4, -1.3, 0], color: "#10b981", label: "Guardrail" },
  { pos: [1.5, -1.2, 0], color: "#a855f7", label: "Tools" },
];

const AgentNode = ({ position, color, active, onHover }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + (active ? 0.15 : 0) + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      <sphereGeometry args={[0.22, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={active ? 0.9 : 0.35}
      />
    </mesh>
  );
};

const Links = ({ pulse }) => {
  const center = NODES[0].pos;
  return (
    <group>
      {NODES.slice(1).map((n) => (
        <mesh key={n.label} position={[(center[0] + n.pos[0]) / 2, (center[1] + n.pos[1]) / 2, 0]}>
          <boxGeometry
            args={[Math.hypot(n.pos[0] - center[0], n.pos[1] - center[1]), 0.02, 0.02]}
          />
          <meshBasicMaterial
            color="#f2ebe3"
            transparent
            opacity={0.15 + pulse * 0.25}
          />
        </mesh>
      ))}
    </group>
  );
};

const AgentNetworkScene = ({ scrollPulse = 0.5 }) => {
  const [hovered, setHovered] = useState(-1);

  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden editorial-surface shadow-beam border border-story-cyan border-opacity-20">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#00e5ff" />
        <Links pulse={scrollPulse} />
        {NODES.map((n, i) => (
          <AgentNode
            key={n.label}
            position={n.pos}
            color={n.color}
            active={hovered === i}
            onHover={(v) => setHovered(v ? i : -1)}
          />
        ))}
      </Canvas>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-story-muted uppercase tracking-wider pointer-events-none">
        Hover nodes · Bayer agent mesh
      </div>
    </div>
  );
};

export default AgentNetworkScene;
