import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface DigitalBrainProps {
  onSelect: (subject: any) => void;
  subjects: any[];
  selectedSubject?: any;
}

function BasePlatform() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]}>
      <cylinderGeometry args={[2.8, 2.8, 0.26, 64]} />
      <meshStandardMaterial color="#020617" emissive="#03050d" roughness={0.6} metalness={0.4} />
    </mesh>
  );
}

function DigitalBrain({ subjects, selectedSubject }: DigitalBrainProps) {
  return (
    <div className="mx-auto h-[360px] w-full max-w-[720px] overflow-hidden rounded-[1.25rem] border border-slate-700/70 bg-slate-950/95 shadow-inner shadow-black/30 sm:h-[420px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 46 }}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.85} />
        <pointLight position={[5, 5, 5]} intensity={3} />
        <pointLight position={[-4, -3, 2]} intensity={2} color="#60a5fa" />

        <BasePlatform />

        <OrbitControls enablePan={false} enableZoom={true} autoRotate autoRotateSpeed={0.55} />
      </Canvas>
    </div>
  );
}

export default DigitalBrain;
