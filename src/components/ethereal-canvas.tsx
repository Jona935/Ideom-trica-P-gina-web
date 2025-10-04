"use client";

import { useRef, useEffect } from "react";

const MAX_BRUSH_SIZE = 50;
const MIN_BRUSH_SIZE = 10;
const BRUSH_DECAY_RATE = 0.3;
const MOUSE_STOP_DELAY = 100;
const FADE_OPACITY = 0.15;

export function EtherealCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const mouseStopTimer = useRef<NodeJS.Timeout>();

  const lastMousePos = useRef({ x: -100, y: -100 });
  const brushRadius = useRef(MAX_BRUSH_SIZE);

  const drawBrushStroke = (x: number, y: number, radius: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(0.5, "rgba(255, 165, 0, 0.1)");
    gradient.addColorStop(1, "rgba(255, 165, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "hsl(14, 80%, 50%)"; // #e74c3c
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    setCanvasDimensions();

    const loop = () => {
      if (!ctx) return;

      // Fade effect
      ctx.fillStyle = `rgba(231, 76, 60, ${FADE_OPACITY})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const { x, y } = lastMousePos.current;
      const radius = brushRadius.current;
      
      // Update cursor
      const scale = radius / MAX_BRUSH_SIZE * 1.5 + 0.5;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;

      animationFrameId.current = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.opacity = '1';
      }

      const dist = Math.hypot(e.clientX - lastMousePos.current.x, e.clientY - lastMousePos.current.y);
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      brushRadius.current = Math.max(MIN_BRUSH_SIZE, brushRadius.current - dist * BRUSH_DECAY_RATE);
      
      drawBrushStroke(e.clientX, e.clientY, brushRadius.current);

      clearTimeout(mouseStopTimer.current);
      mouseStopTimer.current = setTimeout(() => {
          brushRadius.current = MAX_BRUSH_SIZE;
      }, MOUSE_STOP_DELAY);
    };

    const handleMouseOut = () => {
        if (cursor) {
          cursor.style.opacity = '0';
        }
        lastMousePos.current = { x: -999, y: -999 };
    };

    window.addEventListener("resize", setCanvasDimensions);
    document.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseOut);

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseOut);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      clearTimeout(mouseStopTimer.current);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full border-2 border-white bg-white/30 backdrop-blur-sm pointer-events-none z-50 opacity-0 transition-opacity"
      />
    </>
  );
}
