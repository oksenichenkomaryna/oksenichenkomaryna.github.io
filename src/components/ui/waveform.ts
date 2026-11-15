/** Deterministic placeholder waveforms (0–1 amplitudes) until real audio peaks exist. */

const BAR_COUNT = 72;

/** Small seeded PRNG (mulberry32) so server and client render identical bars. */
function seeded(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Speech-like envelope: syllable bumps separated by short pauses. */
function speech(i: number): number {
  const syllable = Math.abs(Math.sin(i * 0.55)) * 0.7;
  const phrase = 0.55 + 0.45 * Math.sin(i * 0.11 + 1.2);
  const pause = i % 18 > 14 ? 0.08 : 1;
  return syllable * phrase * pause;
}

export function placeholderWaveform(kind: "noisy" | "clean"): number[] {
  const rand = seeded(kind === "noisy" ? 7 : 3);
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    const voice = speech(i);
    const value =
      kind === "noisy"
        ? 0.28 + voice * 0.7 + rand() * 0.22 // hiss floor + hum jitter
        : 0.04 + voice + rand() * 0.04;
    return Math.min(1, Math.max(0.03, value));
  });
}

/** Normalises arbitrary peak arrays to 0–1 so the SVG viewBox math stays fixed. */
export function normalise(values: readonly number[]): number[] {
  const max = Math.max(...values.map(Math.abs), Number.EPSILON);
  return values.map((v) => Math.abs(v) / max);
}
