import { EtherealCanvas } from "@/components/ethereal-canvas";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <EtherealCanvas />
      <div className="relative z-10 text-center text-foreground px-4 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 opacity-0 animate-fade-in [animation-delay:200ms]">
          Ethereal Canvas
        </h1>
        <p className="text-lg md:text-xl font-body opacity-0 animate-fade-in [animation-delay:400ms]">
          Move your cursor to paint. Click to change color.
        </p>
      </div>
    </main>
  );
}
