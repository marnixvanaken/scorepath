'use client';

import { useEffect, useState, type CSSProperties } from 'react';

interface Beam {
  id: number;
  style: CSSProperties;
}

export function StadiumHero() {
  const [beams, setBeams] = useState<Beam[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 48 }).map((_, i) => {
      const riseDur = Math.random() * 3 + 4;
      const delay = Math.random() * 6;
      // Cluster beams toward the sides like stadium floodlight banks
      const side = Math.random() > 0.5;
      const x = side
        ? Math.random() * 35
        : 65 + Math.random() * 35;

      return {
        id: i,
        style: {
          left: `${x}%`,
          width: `${Math.floor(Math.random() * 2) + 1}px`,
          height: `${30 + Math.random() * 40}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${riseDur}s`,
          opacity: 0.15 + Math.random() * 0.35,
        },
      };
    });
    setBeams(generated);
  }, []);

  return (
    <div className="stadium-scene" aria-hidden="true">
      {/* Pitch grid floor */}
      <div className="stadium-floor" />

      {/* Center spotlight */}
      <div className="stadium-spotlight" />

      {/* Floodlight beams */}
      <div className="stadium-beams">
        {beams.map((beam) => (
          <div key={beam.id} className="stadium-beam" style={beam.style} />
        ))}
      </div>

      <style>{`
        .stadium-scene {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        /* Pitch-achtige vloerraster van onderen */
        .stadium-floor {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 55%;
          background:
            linear-gradient(
              to top,
              rgba(249, 115, 22, 0.06) 0%,
              transparent 100%
            );
          background-image:
            linear-gradient(rgba(249, 115, 22, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.08) 1px, transparent 1px),
            linear-gradient(to top, rgba(249, 115, 22, 0.06) 0%, transparent 100%);
          background-size: 60px 40px, 60px 40px, 100% 100%;
          transform: perspective(600px) rotateX(55deg);
          transform-origin: bottom center;
          animation: stadiumFloorGlow 4s ease-in-out infinite alternate;
        }

        /* Centraal spotlicht */
        .stadium-spotlight {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 70%;
          background: radial-gradient(
            ellipse at 50% 100%,
            rgba(249, 115, 22, 0.10) 0%,
            rgba(201, 168, 67, 0.05) 40%,
            transparent 70%
          );
          animation: stadiumSpotGlow 5s ease-in-out infinite alternate;
        }

        /* Lichtbundels */
        .stadium-beams {
          position: absolute;
          inset: 0;
        }

        .stadium-beam {
          position: absolute;
          bottom: 0;
          background: linear-gradient(
            to top,
            rgba(249, 115, 22, 0.5),
            rgba(201, 168, 67, 0.2) 50%,
            transparent 100%
          );
          border-radius: 0 0 0 0;
          animation: stadiumBeamRise linear infinite;
        }

        @keyframes stadiumBeamRise {
          0%   { transform: scaleY(0) translateY(0); opacity: 0; }
          20%  { opacity: 1; }
          60%  { transform: scaleY(1) translateY(0); opacity: 0.8; }
          100% { transform: scaleY(1.1) translateY(-8%); opacity: 0; }
        }

        @keyframes stadiumFloorGlow {
          from { opacity: 0.6; }
          to   { opacity: 1; }
        }

        @keyframes stadiumSpotGlow {
          from { opacity: 0.7; transform: translateX(-50%) scaleX(0.9); }
          to   { opacity: 1;   transform: translateX(-50%) scaleX(1.1); }
        }
      `}</style>
    </div>
  );
}
