import { EtherealCanvas } from "@/components/ethereal-canvas";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <svg
          className="w-8 h-8 text-foreground"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <EtherealCanvas />
      <div className="relative z-10 text-center text-foreground px-4 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 opacity-0 animate-fade-in [animation-delay:200ms]">
          Ethereal Canvas
        </h1>
        <p className="text-lg md:text-xl font-body opacity-0 animate-fade-in [animation-delay:400ms]">
          Move your cursor to paint.
        </p>
      </div>
    </main>
  );
}