import confetti from 'canvas-confetti';

/**
 * Executes a full-screen, multi-shot celebration confetti animation
 * matching the Fintech / Web3 theme with emerald green, gold/amber, champagne, and cyan sparks.
 */
export function fireBirthdayConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 99999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Emerald, Gold, Cyan, White palette
  const fintechColors = ['#10B981', '#34D399', '#F59E0B', '#FBBF24', '#06B6D4', '#FFFFFF', '#059669'];

  // Shot 1: Sharp fast burst
  fire(0.25, {
    spread: 30,
    startVelocity: 60,
    colors: fintechColors,
  });

  // Shot 2: Medium dispersion
  fire(0.2, {
    spread: 65,
    colors: fintechColors,
  });

  // Shot 3: Wide high-flying spray
  fire(0.35, {
    spread: 110,
    decay: 0.92,
    scalar: 1.2,
    colors: fintechColors,
  });

  // Shot 4: Floaters
  fire(0.1, {
    spread: 130,
    startVelocity: 30,
    decay: 0.94,
    scalar: 1.4,
    colors: ['#F59E0B', '#10B981', '#FCD34D'],
  });

  // Left Cannon (after 180ms)
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.75 },
      colors: fintechColors,
      zIndex: 99999,
    });
  }, 180);

  // Right Cannon (after 360ms)
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.75 },
      colors: fintechColors,
      zIndex: 99999,
    });
  }, 360);

  // Grand Finale Shower (after 500ms)
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 140,
      origin: { y: 0.5 },
      colors: ['#10B981', '#F59E0B', '#E2E8F0', '#10B981'],
      ticks: 300,
      gravity: 0.8,
      scalar: 1.1,
      zIndex: 99999,
    });
  }, 500);
}
