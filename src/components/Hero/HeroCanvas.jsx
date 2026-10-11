import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

/** Space Grotesk — distinct from site display (Fraunces); built for small orbit type */
const LETTER_FONT =
  "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/spacegrotesk/SpaceGrotesk%5Bwght%5D.ttf";

const MODE = {
  hero: {
    scale: 1.2,
    opacity: 0.58,
    x: 0.25,
    y: 0,
    morph: 0,
    spread: 0,
  },
  work: {
    scale: 1.35,
    opacity: 0.42,
    x: 0.55,
    y: 0.05,
    morph: 0.55,
    spread: 0.2,
  },
  experience: {
    scale: 1.05,
    opacity: 0.26,
    x: -2.05,
    y: 0.05,
    morph: 0.7,
    spread: 0.12,
  },
  skills: {
    scale: 1.05,
    opacity: 0.28,
    x: 0.9,
    y: 0.15,
    morph: 0.35,
    spread: 0.25,
  },
  contact: {
    scale: 1.55,
    opacity: 0.48,
    x: 0.85,
    y: -0.05,
    morph: 1,
    spread: 1,
  },
};

function readMode() {
  const key =
    typeof window !== "undefined" ? window.__sceneMode || "hero" : "hero";
  return MODE[key] || MODE.hero;
}

function sceneKey() {
  return typeof window !== "undefined" ? window.__sceneMode || "hero" : "hero";
}

/**
 * Continuous "joshuadolor" repeated until letters densify into a circle.
 * No ring stroke — the type is the axis.
 */
const ORBIT_UNIT = "JOSHUADOLOR";
const ORBIT_COUNT = ORBIT_UNIT.length * 8; // denser pack → smaller gaps between letters

const ORBIT_GLYPHS = Array.from({ length: ORBIT_COUNT }, (_, i) =>
  ORBIT_UNIT[i % ORBIT_UNIT.length]
);

function OrbitLetters({ opacityRef }) {
  const pivot = useRef(null);
  const mats = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s =
      typeof window !== "undefined" && typeof window.__sceneScroll === "number"
        ? window.__sceneScroll
        : 0;
    const key = sceneKey();
    const speed = key === "contact" ? 0.2 : key === "experience" ? 0.08 : 0.12;

    if (pivot.current) {
      pivot.current.rotation.y = t * speed + s * Math.PI * 0.4;
      pivot.current.rotation.x = 0.8 + Math.sin(t * 0.12) * 0.03;
      pivot.current.rotation.z = 0.08;
    }

    const op = Math.min(0.7, (opacityRef?.current ?? 0.4) * 1.1 + 0.12);
    mats.current.forEach((mat) => {
      if (mat) mat.opacity = op;
    });
  });

  const radius = 2.15;

  return (
    <group ref={pivot}>
      {ORBIT_GLYPHS.map((glyph, i) => {
        const angle = (i / ORBIT_GLYPHS.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isStart = glyph === "J" && i % ORBIT_UNIT.length === 0;

        return (
          <Billboard key={`orbit-${i}`} position={[x, 0, z]} follow>
            <Text
              font={LETTER_FONT}
              fontSize={0.048}
              fontWeight={600}
              color={isStart ? "#60a5fa" : "#a8b0c0"}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.0015}
              outlineColor="#0a0a0a"
              material-transparent
              material-depthWrite={false}
              onSync={(troika) => {
                mats.current[i] = troika.material;
              }}
            >
              {glyph}
            </Text>
          </Billboard>
        );
      })}
    </group>
  );
}

function SceneForm({ active }) {
  const root = useRef(null);
  const ico = useRef(null);
  const octa = useRef(null);
  const tetra = useRef(null);
  const ringA = useRef(null);
  const ringB = useRef(null);
  const ringC = useRef(null);
  const sparks = useRef(null);
  const core = useRef(null);
  const coreMark = useRef(null);
  const coreSpin = useRef(null);
  const letterOpacity = useRef(0.55);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const smooth = useRef(new THREE.Vector2(0, 0));
  const scroll = useRef(0);
  const mode = useRef({ ...MODE.hero });
  const chapter = useRef(0);

  const sparkGeo = useMemo(() => {
    const count = 64;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const a = (i / count) * Math.PI * 2;
      const r = 1.65 + (i % 7) * 0.1;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.sin(a * 1.7) * 0.4;
      positions[i * 3 + 2] = Math.sin(a) * r * 0.55;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!active || !root.current) return;
    const t = state.clock.elapsedTime;
    const damp = 1 - Math.exp(-3.2 * delta);
    const key = sceneKey();
    const isContact = key === "contact";
    const isExperience = key === "experience";

    smooth.current.lerp(mouse.current, damp);

    const targetScroll =
      typeof window !== "undefined" && typeof window.__sceneScroll === "number"
        ? window.__sceneScroll
        : 0;
    scroll.current += (targetScroll - scroll.current) * (1 - Math.exp(-4 * delta));

    const targetMode = readMode();
    mode.current.scale += (targetMode.scale - mode.current.scale) * damp;
    mode.current.opacity += (targetMode.opacity - mode.current.opacity) * damp;
    mode.current.x += (targetMode.x - mode.current.x) * damp;
    mode.current.y += (targetMode.y - mode.current.y) * damp;
    mode.current.morph += (targetMode.morph - mode.current.morph) * damp;
    mode.current.spread += (targetMode.spread - mode.current.spread) * damp;

    const targetChapter =
      typeof window !== "undefined" && typeof window.__sceneChapter === "number"
        ? window.__sceneChapter
        : 0;
    chapter.current += (targetChapter - chapter.current) * damp;

    const s = scroll.current;
    const m = mode.current;
    const ch = chapter.current;
    const breathe = Math.sin(t * (isContact ? 0.9 : 0.45)) * (isContact ? 0.05 : 0.02);
    const spin = isContact ? 1.8 : 1;

    root.current.rotation.y =
      s * Math.PI * 2.1 * spin +
      smooth.current.x * 0.3 +
      ch * 0.35 +
      (isContact ? t * 0.12 : 0);
    root.current.rotation.x =
      0.28 +
      smooth.current.y * 0.14 +
      s * 0.5 +
      Math.sin(t * 0.2) * 0.04 +
      (isContact ? Math.sin(t * 0.55) * 0.12 : 0);
    root.current.rotation.z = isContact ? Math.sin(t * 0.25) * 0.08 : 0;
    root.current.position.x = m.x + smooth.current.x * 0.18;
    root.current.position.y = m.y + smooth.current.y * 0.12 - s * 0.12;
    root.current.scale.setScalar(m.scale + breathe + Math.sin(s * Math.PI) * 0.04);

    if (ico.current) {
      ico.current.material.opacity = m.opacity * (1 - m.morph * 0.85);
      ico.current.rotation.y = t * 0.08 * spin;
      ico.current.visible = m.morph < 0.95;
    }
    if (octa.current) {
      octa.current.material.opacity = m.opacity * (0.15 + m.morph * 0.85);
      octa.current.rotation.y = -t * 0.12 * spin - s * 1.2;
      octa.current.rotation.z = ch * 0.4;
    }
    if (tetra.current) {
      // Contact flourish — tetra blooms in on the finale
      const bloom = Math.max(0, m.spread - 0.35);
      tetra.current.material.opacity = m.opacity * bloom * 0.9;
      tetra.current.rotation.x = t * 0.35;
      tetra.current.rotation.y = -t * 0.28;
      tetra.current.scale.setScalar(0.7 + bloom * 0.55 + Math.sin(t * 1.2) * 0.04);
      tetra.current.visible = bloom > 0.05;
    }
    if (ringA.current) {
      ringA.current.rotation.z = -s * Math.PI * 1.5 + t * (isContact ? 0.45 : 0.15);
      ringA.current.rotation.x = Math.PI / 2.2 + s * 0.3;
      ringA.current.material.opacity = Math.min(0.9, m.opacity + (isContact ? 0.35 : 0.2));
      ringA.current.scale.setScalar(1 + m.spread * 0.35);
    }
    if (ringB.current) {
      ringB.current.rotation.z = s * Math.PI * 0.9 - t * (isContact ? 0.35 : 0.1);
      ringB.current.rotation.y = 0.4 + ch * 0.2;
      ringB.current.material.opacity = 0.2 + m.morph * 0.35 + m.spread * 0.25;
      ringB.current.scale.setScalar(1 + m.morph * 0.2 + m.spread * 0.4);
    }
    if (ringC.current) {
      const show = m.spread;
      ringC.current.material.opacity = show * (isContact ? 0.55 : 0.15);
      ringC.current.rotation.x = t * 0.2;
      ringC.current.rotation.z = -t * 0.55 + s * Math.PI;
      ringC.current.scale.setScalar(0.85 + show * 0.7);
      ringC.current.visible = show > 0.08;
    }
    if (sparks.current) {
      sparks.current.rotation.y = t * (isContact ? 0.55 : 0.2) + s * Math.PI;
      sparks.current.rotation.x = isContact ? t * 0.15 : 0;
      const sparkBase = isExperience
        ? 0.08
        : isContact
          ? 0.55
          : 0.15 + m.morph * 0.35;
      sparks.current.material.opacity = sparkBase * Math.min(1, m.opacity * 3.5);
      sparks.current.material.size = isContact ? 0.05 : 0.035;
    }
    if (coreMark.current) {
      const pulse = isContact ? 1 + Math.sin(t * 2.4) * 0.12 : 1;
      coreMark.current.scale.setScalar(pulse);
    }
    if (coreSpin.current) {
      // Coin flip on Y — scroll only
      coreSpin.current.rotation.y = s * Math.PI * 1.6;
      coreSpin.current.rotation.x = 0;
    }

    letterOpacity.current = m.opacity;
  });

  return (
    <group ref={root}>
      <OrbitLetters opacityRef={letterOpacity} />
      <mesh ref={ico}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={octa} scale={0.92}>
        <octahedronGeometry args={[1.25, 0]} />
        <meshBasicMaterial
          color="#60a5fa"
          wireframe
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={tetra} scale={0.8}>
        <tetrahedronGeometry args={[1.45, 0]} />
        <meshBasicMaterial
          color="#f5b942"
          wireframe
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.2, 0.2, 0]}>
        <torusGeometry args={[1.55, 0.012, 12, 96]} />
        <meshBasicMaterial
          color="#f5b942"
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringB} rotation={[0.9, 0.5, 0.2]}>
        <torusGeometry args={[1.9, 0.006, 8, 80]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringC} rotation={[1.2, 0.1, 0.4]}>
        <torusGeometry args={[2.35, 0.005, 8, 100]} />
        <meshBasicMaterial
          color="#f5b942"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      <points ref={sparks} geometry={sparkGeo}>
        <pointsMaterial
          color="#f5b942"
          size={0.035}
          transparent
          opacity={0.35}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      {/* Live site mark: JD. on a gray coin — flips on scroll */}
      <group ref={coreMark}>
        <Billboard follow>
          <group ref={coreSpin}>
            {/* Thin coin body (axis along Z so faces camera) */}
            <mesh ref={core} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.022, 48]} />
              <meshBasicMaterial color="#5b6578" />
            </mesh>
            {/* Rim catch-light */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.132, 0.132, 0.01, 48, 1, true]} />
              <meshBasicMaterial
                color="#9ca3af"
                transparent
                opacity={0.55}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Front face */}
            <group position={[0, 0, 0.012]}>
              <Text
                font={LETTER_FONT}
                fontSize={0.065}
                fontWeight={700}
                letterSpacing={-0.06}
                color="#f5f5f5"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.002}
                outlineColor="#1f2937"
                material-depthWrite={false}
              >
                JD
              </Text>
              <mesh position={[0.058, -0.018, 0.002]}>
                <circleGeometry args={[0.011, 16]} />
                <meshBasicMaterial color="#3b82f6" depthWrite={false} />
              </mesh>
            </group>
            {/* Back face (mirrored so it reads when the coin flips) */}
            <group position={[0, 0, -0.012]} rotation={[0, Math.PI, 0]}>
              <Text
                font={LETTER_FONT}
                fontSize={0.065}
                fontWeight={700}
                letterSpacing={-0.06}
                color="#f5f5f5"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.002}
                outlineColor="#1f2937"
                material-depthWrite={false}
              >
                JD
              </Text>
              <mesh position={[0.058, -0.018, 0.002]}>
                <circleGeometry args={[0.011, 16]} />
                <meshBasicMaterial color="#3b82f6" depthWrite={false} />
              </mesh>
            </group>
          </group>
        </Billboard>
      </group>
    </group>
  );
}

export default function HeroCanvas({ active = true }) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none scene-canvas"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-40 md:opacity-100">
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 5.4], fov: 40 }}
          frameloop={active ? "always" : "demand"}
          style={{ width: "100%", height: "100%" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.setAttribute("role", "img");
            gl.domElement.setAttribute(
              "aria-label",
              "Decorative 3D scene with Joshua Dolor lettered along an orbit"
            );
          }}
        >
          <Suspense fallback={null}>
            <SceneForm active={active} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
