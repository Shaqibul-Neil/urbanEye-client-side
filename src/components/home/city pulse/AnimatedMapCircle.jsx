import { useEffect, useState } from "react";
import { Circle } from "react-leaflet";

const getMarkerColor = (intensity) => {
  switch (intensity) {
    case "high":
      return "#ef4444"; // red
    case "medium":
      return "#f59e0b"; // amber
    case "low":
      return "#10b981"; // green
    default:
      return "#6b7280";
  }
};

const getMarkerRadius = (intensity) => {
  switch (intensity) {
    case "high":
      return 900;
    case "medium":
      return 600;
    case "low":
      return 400;
    default:
      return 500;
  }
};

export const AnimatedMapCircle = ({ point, onSelect }) => {
  const baseRadius = getMarkerRadius(point.intensity);

  // Main circle animation
  const [radius, setRadius] = useState(0);
  const [opacity, setOpacity] = useState(0);

  // Sonar wave animation
  const [waveRadius, setWaveRadius] = useState(baseRadius);
  const [waveOpacity, setWaveOpacity] = useState(0.6);

  /* Initial grow animation */
  useEffect(() => {
    let frame = 0;
    const totalFrames = 30;

    const intro = setInterval(() => {
      frame++;
      setRadius((baseRadius / totalFrames) * frame);
      setOpacity(Math.min(frame / totalFrames, 1));

      if (frame >= totalFrames) clearInterval(intro);
    }, 16);

    return () => clearInterval(intro);
  }, [baseRadius]);

  /* Sonar wave loop */
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveRadius(baseRadius);
      setWaveOpacity(0.5);

      let frame = 0;
      const totalFrames = 60;

      const wave = setInterval(() => {
        frame++;
        setWaveRadius(baseRadius + (baseRadius * frame) / totalFrames);
        setWaveOpacity(0.5 - frame / totalFrames);

        if (frame >= totalFrames) clearInterval(wave);
      }, 16);
    }, 500); // wave every 500ms

    return () => clearInterval(interval);
  }, [baseRadius]);

  const color = getMarkerColor(point.intensity);

  return (
    <>
      {/* Sonar Wave */}
      <Circle
        center={point.position}
        radius={waveRadius}
        pathOptions={{
          color,
          weight: 1,
          opacity: waveOpacity,
          fillOpacity: 0,
        }}
      />

      {/* Main Circle */}
      <Circle
        center={point.position}
        radius={radius}
        eventHandlers={{
          click: () => onSelect(point),
        }}
        pathOptions={{
          fillColor: color,
          color,
          weight: 2,
          fillOpacity: opacity,
          opacity,
        }}
      />
    </>
  );
};
