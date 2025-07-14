"use client";

import { useEffect, useRef, useState } from "react";

// 3rd party
import { IconType } from "react-icons";

interface FloatingIconProps {
  Icon: IconType;
  size?: number;
  className?: string;
  containerRef: React.RefObject<HTMLDivElement>;
  speed?: number;
}

export function FloatingIcon({
  Icon,
  size = 24,
  className = "",
  containerRef,
  speed = 0.5,
}: FloatingIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const directionRef = useRef({
    x: Math.random() > 0.5 ? 1 : -1,
    y: Math.random() > 0.5 ? 1 : -1,
  });
  const speedRef = useRef(speed);

  useEffect(() => {
    if (!containerRef.current || !iconRef.current) return;

    const container = containerRef.current;
    const icon = iconRef.current;

    const maxX = container.clientWidth - icon.clientWidth;
    const maxY = container.clientHeight - icon.clientHeight;

    setPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });

    let animationFrameId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      if (!containerRef.current || !iconRef.current) return;

      if (time - lastTime > 32) {
        const container = containerRef.current;
        const icon = iconRef.current;
        const maxX = container.clientWidth - icon.clientWidth;
        const maxY = container.clientHeight - icon.clientHeight;

        setPosition((prev) => {
          let newX = prev.x + directionRef.current.x * speedRef.current;
          let newY = prev.y + directionRef.current.y * speedRef.current;

          if (newX <= 0 || newX >= maxX) {
            directionRef.current.x *= -1;
            newX = Math.max(0, Math.min(newX, maxX));
          }

          if (newY <= 0 || newY >= maxY) {
            directionRef.current.y *= -1;
            newY = Math.max(0, Math.min(newY, maxY));
          }

          return { x: newX, y: newY };
        });

        lastTime = time;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [containerRef]);

  return (
    <div
      ref={iconRef}
      className={`absolute ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${size}px`,
        height: `${size}px`,
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      <Icon size={size} className="w-full h-full text-primary" />
    </div>
  );
}
