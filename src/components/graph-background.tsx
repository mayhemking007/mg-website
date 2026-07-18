"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  accent: boolean;
  neighbors: number[];
};

type Pulse = {
  from: number;
  to: number;
  startedAt: number;
  duration: number;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createNodes(width: number, height: number, compact: boolean) {
  const density = compact ? 19000 : 15000;
  const count = clamp(Math.round((width * height) / density), compact ? 40 : 120, compact ? 68 : 180);
  const random = seededRandom(Math.round(width * 13 + height * 17));
  const nodes: Node[] = Array.from({ length: count }, () => ({
    x: random() * width,
    y: random() * height,
    radius: random() < 0.08 ? 3.5 + random() * 0.7 : 2 + random() * 1.1,
    opacity: 0.16 + random() * 0.16,
    accent: random() < 0.2,
    neighbors: [],
  }));

  const maximumDistance = compact ? 150 : 190;
  nodes.forEach((node, index) => {
    const nearest = nodes
      .map((candidate, candidateIndex) => ({
        index: candidateIndex,
        distance: Math.hypot(candidate.x - node.x, candidate.y - node.y),
      }))
      .filter((candidate) => candidate.index !== index && candidate.distance < maximumDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
    node.neighbors = nearest.map((candidate) => candidate.index);
  });

  return nodes;
}

export function GraphBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const compactViewport = window.matchMedia("(max-width: 767px)");
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let nextPulseAt = 0;
    let frame = 0;
    let width = 0;
    let height = 0;
    let pageVisible = !document.hidden;
    let pointerActive = false;
    let pointerX = -1000;
    let pointerY = -1000;

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const maximumPulses = compactViewport.matches ? 1 : 3;
      if (!reducedMotion.matches && time >= nextPulseAt && pulses.length < maximumPulses) {
        const eligible = nodes
          .map((node, index) => ({ node, index }))
          .filter(({ node }) => node.neighbors.length > 0);
        if (eligible.length) {
          const origin = eligible[Math.floor(Math.random() * eligible.length)];
          pulses.push({
            from: origin.index,
            to: origin.node.neighbors[Math.floor(Math.random() * origin.node.neighbors.length)],
            startedAt: time,
            duration: 1100 + Math.random() * 400,
          });
          nextPulseAt = time + 250 + Math.random() * 400;
        }
      }

      for (const pulse of pulses) {
        const from = nodes[pulse.from];
        const to = nodes[pulse.to];
        const progress = clamp((time - pulse.startedAt) / pulse.duration, 0, 1);
        const fade = Math.sin(progress * Math.PI);
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = `rgba(110, 231, 183, ${0.22 * fade})`;
        context.lineWidth = 0.85;
        context.stroke();

        const headX = from.x + (to.x - from.x) * progress;
        const headY = from.y + (to.y - from.y) * progress;
        const glow = context.createRadialGradient(headX, headY, 0, headX, headY, 10);
        glow.addColorStop(0, `rgba(209, 250, 229, ${0.92 * fade})`);
        glow.addColorStop(0.22, `rgba(110, 231, 183, ${0.52 * fade})`);
        glow.addColorStop(1, "rgba(110, 231, 183, 0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(headX, headY, 10, 0, Math.PI * 2);
        context.fill();

      }
      pulses = pulses.filter((activePulse) => time - activePulse.startedAt < activePulse.duration);

      for (const node of nodes) {
        const distance = pointerActive && finePointer.matches
          ? Math.hypot(node.x - pointerX, node.y - pointerY)
          : Number.POSITIVE_INFINITY;
        const proximity = clamp(1 - distance / 120, 0, 1);
        const radius = node.radius * (1 + proximity * 0.5);
        const opacity = node.opacity + proximity * 0.24;
        context.fillStyle = node.accent
          ? `rgba(110, 231, 183, ${opacity})`
          : `rgba(148, 163, 184, ${opacity})`;
        context.beginPath();
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      if (!reducedMotion.matches && pageVisible) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      nodes = createNodes(width, height, compactViewport.matches);
      pulses = [];
      nextPulseAt = performance.now() + 350;
      if (reducedMotion.matches) draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerActive = true;
    };
    const onPointerLeave = () => { pointerActive = false; };
    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      cancelAnimationFrame(frame);
      if (pageVisible && !reducedMotion.matches) frame = requestAnimationFrame(draw);
    };
    const onMotionChange = () => {
      cancelAnimationFrame(frame);
      pulses = [];
      if (reducedMotion.matches) draw(performance.now());
      else frame = requestAnimationFrame(draw);
    };

    resize();
    if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="graph-background" aria-hidden="true" />;
}
