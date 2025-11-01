declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    x?: number;
    y?: number;
    shapes?: string[];
    zIndex?: number;
    colors?: string[];
    disableForReducedMotion?: boolean;
    scalar?: number;
    origin?: { x?: number; y?: number };
  }

  interface ConfettiFunction {
    (options?: ConfettiOptions): Promise<void>;
    reset(): void;
  }

  const confetti: ConfettiFunction;
  export default confetti;
}