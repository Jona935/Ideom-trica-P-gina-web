"use client";

import { useRef, useEffect } from "react";

const MAX_BRUSH_SIZE = 60;
const MIN_BRUSH_SIZE = 15;
const BRUSH_DECAY_RATE = 0.5;
const MOUSE_STOP_DELAY = 100;

export function EtherealCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const mouseStopTimer = useRef<NodeJS.Timeout>();

  const lastMousePos = useRef({ x: -100, y: -100 });
  const lastDrawPos = useRef<{ x: number; y: number } | null>(null);
  const brushRadius = useRef(MAX_BRUSH_SIZE);
  const points = useRef<{ x: number; y: number; speed: number }[]>([]);

  const drawBrushStroke = (ctx: CanvasRenderingContext2D) => {
    if (points.current.length < 2) {
      return;
    }

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    let p1 = points.current[0];
    let p2 = points.current[1];

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);

    for (let i = 1; i < points.current.length; i++) {
      const midPoint = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      };
      
      const radius = Math.max(MIN_BRUSH_SIZE, MAX_BRUSH_SIZE - p1.speed * BRUSH_DECAY_RATE);
      ctx.lineWidth = radius * 2;
      
      const gradient = ctx.createRadialGradient(midPoint.x, midPoint.y, 0, midPoint.x, midPoint.y, radius);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.15)");
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.1)");
      gradient.addColorStop(0.7, "rgba(255, 165, 0, 0.05)");
      gradient.addColorStop(1, "rgba(255, 165, 0, 0)");
      ctx.strokeStyle = gradient;

      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      ctx.stroke();

      p1 = points.current[i];
      p2 = points.current[i + 1];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "hsl(14, 80%, 50%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      points.current = [];
      lastDrawPos.current = null;
    };

    setCanvasDimensions();

    const loop = () => {
      drawBrushStroke(ctx);
      points.current = []; // Clear points after drawing each frame
      
      if (cursor) {
        const { x, y } = lastMousePos.current;
        const scale = brushRadius.current / MAX_BRUSH_SIZE * 1.5 + 0.5;
        const currentTransform = cursor.style.transform;
        const newTransform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
        
        if(currentTransform !== newTransform) {
            const transition = currentTransform ? 'transform 0.1s ease-out' : 'none';
            cursor.style.transition = transition;
            cursor.style.transform = newTransform;
        }
      }
      
      animationFrameId.current = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.opacity = '1';
      }

      const currentPos = { x: e.clientX, y: e.clientY };
      
      const lastPos = lastMousePos.current || currentPos;
      const speed = Math.hypot(currentPos.x - lastPos.x, currentPos.y - lastPos.y);

      points.current.push({ ...currentPos, speed });
      
      lastMousePos.current = currentPos;
      brushRadius.current = Math.max(MIN_BRUSH_SIZE, MAX_BRUSH_SIZE - speed * BRUSH_DECAY_RATE * 2);

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
        points.current = [];
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
        className="fixed top-0 left-0 w-4 h-4 rounded-full border-2 border-white bg-white/30 backdrop-blur-sm pointer-events-none z-50 opacity-0"
      />
    </>
  );
}
