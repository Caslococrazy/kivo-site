"use client";

import { useEffect, useRef } from "react";

interface Layer {
  amp: number;
  speed: number;
  base: number;
  slope: number;
  color: string;
  alpha: number;
  width: number;
  fill: boolean;
}

const LAYERS: Layer[] = [
  { amp: 0.06, speed: 0.55, base: 0.78, slope: 0.34, color: "rgba(203,240,0,", alpha: 0.55, width: 3.5, fill: true },
  { amp: 0.09, speed: 0.38, base: 0.66, slope: 0.24, color: "rgba(203,240,0,", alpha: 0.26, width: 2.5, fill: false },
  { amp: 0.045, speed: 0.72, base: 0.86, slope: 0.18, color: "rgba(238,250,171,", alpha: 0.2, width: 2, fill: false },
];

function layerY(l: Layer, xn: number, t: number, H: number) {
  const wave =
    Math.sin(xn * 5.2 + t * l.speed * 3.1) * 0.45 +
    Math.sin(xn * 11.7 - t * l.speed * 2.2) * 0.28 +
    Math.sin(xn * 23.0 + t * l.speed * 4.7) * 0.14;
  return H * (l.base - l.slope * xn + wave * l.amp);
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const container = cv.parentElement;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let rafId = 0;

    function resize() {
      if (!cv || !container) return;
      W = container.offsetWidth;
      H = container.offsetHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);
      const STEPS = 90;
      LAYERS.forEach((l) => {
        ctx!.beginPath();
        for (let i = 0; i <= STEPS; i++) {
          const xn = i / STEPS;
          const px = xn * W;
          const py = layerY(l, xn, t, H);
          i === 0 ? ctx!.moveTo(px, py) : ctx!.lineTo(px, py);
        }
        if (l.fill) {
          const fillPath = new Path2D();
          for (let i = 0; i <= STEPS; i++) {
            const xn = i / STEPS;
            const px = xn * W;
            const py = layerY(l, xn, t, H);
            i === 0 ? fillPath.moveTo(px, py) : fillPath.lineTo(px, py);
          }
          fillPath.lineTo(W, H);
          fillPath.lineTo(0, H);
          fillPath.closePath();
          const g = ctx!.createLinearGradient(0, H * 0.3, 0, H);
          g.addColorStop(0, "rgba(203,240,0,.20)");
          g.addColorStop(1, "rgba(203,240,0,0)");
          ctx!.fillStyle = g;
          ctx!.fill(fillPath);
        }
        ctx!.strokeStyle = l.color + l.alpha + ")";
        ctx!.lineWidth = l.width;
        ctx!.stroke();
      });
    }

    if (reduced) {
      draw(0);
    } else {
      let t = 0;
      const frame = () => {
        draw(t);
        t += 0.028;
        rafId = requestAnimationFrame(frame);
      };
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50 [filter:blur(9px)_saturate(1.1)]"
    />
  );
}
