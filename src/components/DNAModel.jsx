import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const DNAJoint = ({ position, color = "#10b981" }) => (
  <mesh position={position}>
    <sphereGeometry args={[0.12, 16, 16]} />
    <meshStandardMaterial 
      color={color} 
      emissive={color} 
      emissiveIntensity={4} 
      metalness={0.8}
    />
  </mesh>
);

const DNAHelix = () => {
  const groupRef = useRef();

  const { strand1, strand2, rungs } = useMemo(() => {
    const s1 = [];
    const s2 = [];
    const r = [];
    const count = 40;
    const height = 12;
    const radius = 1.2;
    const twist = 0.5;

    for (let i = 0; i <= count; i++) {
      const angle = (i / count) * height * twist;
      const y = (i / count) * height - height / 2;
      
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const p1 = new THREE.Vector3(x1, y, z1);
      s1.push(p1);

      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      const p2 = new THREE.Vector3(x2, y, z2);
      s2.push(p2);

      if (i % 2 === 0) {
        r.push({ p1, p2, y, angle });
      }
    }
    return { 
      strand1: new THREE.CatmullRomCurve3(s1), 
      strand2: new THREE.CatmullRomCurve3(s2), 
      rungs: r 
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Principal Strands */}
      <mesh>
        <tubeGeometry args={[strand1, 64, 0.08, 8, false]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={3} />
      </mesh>
      <mesh>
        <tubeGeometry args={[strand2, 64, 0.08, 8, false]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={3} />
      </mesh>

      {/* Rungs & Joints */}
      {rungs.map((rung, i) => (
        <group key={i}>
            <DNAJoint position={[rung.p1.x, rung.p1.y, rung.p1.z]} color="#10b981" />
            <DNAJoint position={[rung.p2.x, rung.p2.y, rung.p2.z]} color="#34d399" />
            <mesh position={[0, rung.y, 0]} rotation={[0, -rung.angle, Math.PI / 2]}>
                <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
                <meshStandardMaterial 
                    color="#ffffff" 
                    transparent 
                    opacity={0.3} 
                    emissive="#10b981" 
                    emissiveIntensity={1} 
                />
            </mesh>
        </group>
      ))}
    </group>
  );
};

const DNAModel = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#34d399" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <DNAHelix />
        </Float>

        {/* Clinical floating particles */}
        <Stars radius={50} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default DNAModel;
