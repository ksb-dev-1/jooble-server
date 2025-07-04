"use client";

import { useRef } from "react";

// 3rd party
import {
  SiAccenture,
  SiInfosys,
  SiWipro,
  SiSwiggy,
  SiNetflix,
  SiPaytm,
  SiAdidas,
  SiFlipkart,
  SiZomato,
} from "react-icons/si";
import {
  FaAtlassian,
  FaSpotify,
  FaMicrosoft,
  FaUber,
  FaGoogle,
} from "react-icons/fa";
import { FaAmazon } from "react-icons/fa6";

import { FloatingIcon } from "./FloatingIcon";
import type { IconType } from "react-icons";

const icons: IconType[] = [
  SiAccenture,
  SiInfosys,
  SiWipro,
  SiSwiggy,
  FaAtlassian,
  FaGoogle,
  SiNetflix,
  FaSpotify,
  FaMicrosoft,
  FaUber,
  SiPaytm,
  SiAdidas,
  FaAmazon,
  SiFlipkart,
  SiZomato,
];

const FloatingIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="absolute z-10 h-full w-full pointer-events-none"
      aria-hidden="true"
    >
      {icons.map((Icon, index) => (
        <FloatingIcon
          key={index}
          Icon={Icon}
          containerRef={containerRef}
          size={24 + Math.floor(Math.random() * 40)}
          className="duration-300"
          speed={0.3 + Math.random() * 0.4}
        />
      ))}
    </div>
  );
};

export default FloatingIcons;
