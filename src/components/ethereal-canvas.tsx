"use client";

import { useRef, useEffect } from "react";

// --- CONFIGURACIÓN ---
// Cambia estos valores para personalizar el efecto

// El color del pincel.
const BRUSH_COLOR = "#ff2a00";

// La velocidad a la que se desvanecen los trazos.
// Un valor más alto (ej. 0.1) hace que se borren más rápido.
// Un valor más bajo (ej. 0.02) deja una estela más larga.
const FADE_AMOUNT = 0.05;

// --- COMPONENTE ---

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
      // --- INICIO DE LA NUEVA LÓGICA DE DESVANECIMIENTO ---

      // 1. Cambiamos el modo de composición a 'destination-out'.
      // Esto hace que lo que dibujemos a continuación, en lugar de pintar, borre.
      ctx.globalCompositeOperation = 'destination-out';

      // 2. Dibujamos un rectángulo semi-transparente.
      // El color no importa, solo su opacidad (alpha).
      // Esto "resta" un 5% de opacidad a todo el lienzo en cada fotograma.
      ctx.fillStyle = `rgba(0, 0, 0, ${FADE_AMOUNT})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. MUY IMPORTANTE: Regresamos al modo de composición normal.
      // Si no hacemos esto, las nuevas pinceladas también borrarían en lugar de pintar.
      ctx.globalCompositeOperation = 'source-over';

      // --- FIN DE LA NUEVA LÓGICA DE DESVANECIMIENTO ---

      // Calcula el radio del pincel para que tenga un efecto pulsante.
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

    // --- MANEJADORES DE EVENTOS ---
    const handleMouseMove = (e: MouseEvent) => {
      draw(e.clientX, e.clientY);
    };
    
    const handleMouseOut = () => {
        lastPos.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        const touch = e.touches[0];
        draw(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      lastPos.current = null;
    };

    // --- REGISTRO Y LIMPIEZA DE EVENTOS ---
    window.addEventListener("resize", setCanvasDimensions);
    document.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseOut);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    
    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseOut);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    // Se ha restaurado el fondo transparente.
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full bg-transparent"
      style={{ touchAction: 'none' }}
    />
  );
}