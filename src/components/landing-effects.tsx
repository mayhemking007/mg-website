"use client";

import { useEffect } from "react";

export function LandingEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const glow = document.querySelector<HTMLElement>("[data-cursor-glow]");
    if (!glow || reduceMotion.matches || !finePointer.matches) return;
    let frame = 0, idleTimer = 0;
    let currentX = window.innerWidth / 2, currentY = window.innerHeight / 2;
    let targetX = currentX, targetY = currentY;
    const render = () => { currentX += (targetX - currentX) * .12; currentY += (targetY - currentY) * .12; glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`; frame = requestAnimationFrame(render); };
    const onPointerMove = (event: PointerEvent) => { targetX = event.clientX; targetY = event.clientY; glow.dataset.visible = "true"; window.clearTimeout(idleTimer); idleTimer = window.setTimeout(() => { glow.dataset.visible = "false"; }, 1500); };
    const onPointerLeave = () => { glow.dataset.visible = "false"; };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    frame = requestAnimationFrame(render);
    return () => { window.removeEventListener("pointermove", onPointerMove); document.documentElement.removeEventListener("mouseleave", onPointerLeave); window.clearTimeout(idleTimer); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { elements.forEach((element) => { element.dataset.revealed = "true"; }); return; }
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.revealed = "true"; observer.unobserve(entry.target); } }); }, { rootMargin: "0px 0px -10%", threshold: .12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <div className="cursor-glow" data-cursor-glow data-visible="false" aria-hidden="true" />;
}
