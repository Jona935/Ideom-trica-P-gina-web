"use client";

import { useRef, useEffect } from "react";

// The brush color will be a darker shade of the background.
const BRUSH_COLOR = "#ff2a00";

export function EtherealCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const lastPos = useRef<{ x: number; y: number } | null>(null);
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

    const draw = (x: number, y: number) => {
      if (lastPos.current) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = BRUSH_COLOR;
        ctx.lineWidth = radius.current;
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      lastPos.current = { x, y };
    };

    const handleMouseMove = (e: MouseEvent) => {
      draw(e.clientX, e.clientY);
    };
    
    const handleMouseOut = () => {
        lastPos.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        // Prevent scrolling while drawing
        e.preventDefault();
        const touch = e.touches[0];
        draw(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      lastPos.current = null;
    };

    window.addEventListener("resize", setCanvasDimensions);
    document.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseOut);

    // Add touch event listeners
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    
    // Start animation loop
    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseOut);

      // Clean up touch event listeners
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      
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
