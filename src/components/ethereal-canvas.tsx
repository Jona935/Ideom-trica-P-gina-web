"use client";

import { useRef, useEffect } from "react";

// The brush color will be a darker shade of the background.
const BRUSH_COLOR = "#ff2a00";

export function EtherealCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const radius = useRef(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasDimensions();

    const loop = () => {
      const millis = Date.now() - startTime.current;
      radius.current = 2 + Math.abs(Math.sin(millis * 0.003) * 50);
      animationFrameId.current = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };

      if (lastMousePos.current) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = BRUSH_COLOR;
        ctx.lineWidth = radius.current;
        ctx.beginPath();
        ctx.moveTo(lastMousePos.current.x, lastMousePos.current.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.stroke();
      }
      
      lastMousePos.current = currentPos;
    };
    
    const handleMouseOut = () => {
        lastMousePos.current = null;
    };

    window.addEventListener("resize", setCanvasDimensions);
    document.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseOut);
    
    // Start animation loop
    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseOut);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-transparent" />
    </>
  );
}
