import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
const Particles = ({ mouse }) => {
  const ref = useRef();
  const count = 380;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x =
      mouse.current.y * 0.08 + Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    ref.current.rotation.z = mouse.current.x * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#f2ebe3"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
};

const Beam = () => (
  <mesh position={[2.5, 0.5, -3]} rotation={[0, -0.4, 0]}>
    <planeGeometry args={[0.15, 8]} />
    <meshBasicMaterial color="#00e5ff" transparent opacity={0.06} />
  </mesh>
);

const Scene = ({ mouse }) => (
  <>
    <ambientLight intensity={0.4} />
    <pointLight position={[4, 2, 2]} intensity={0.5} color="#ff9e2c" />
    <Particles mouse={mouse} />
    <Beam />
  </>
);

const BackgroundCanvas = () => {
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const move = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#080706"]} />
        <fog attach="fog" args={["#080706", 4, 14]} />
        <Scene mouse={mouse} />
      </Canvas>
      <div className="absolute inset-0 beam-accent opacity-80" />
    </div>
  );
};

export default BackgroundCanvas;
