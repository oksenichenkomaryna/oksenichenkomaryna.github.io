/**
 * Decorative caption-cue timing: lays the quotes out on a subtitle track like an
 * editor would — each cue lasts as long as it takes to read (~17 chars/s, the
 * common subtitle reading-speed guideline), with a short gap between cues.
 */
const READING_CHARS_PER_SECOND = 17;
const MIN_CUE_SECONDS = 2;
const FIRST_CUE_SECONDS = 2;
const GAP_SECONDS = 1.2;

export interface Cue<T> {
  item: T;
  /** Cue in/out in seconds on the decorative track. */
  in: number;
  out: number;
}

export function toCues<T>(items: readonly T[], text: (item: T) => string): Cue<T>[] {
  let cursor = FIRST_CUE_SECONDS;
  return items.map((item) => {
    const length = Math.max(MIN_CUE_SECONDS, text(item).length / READING_CHARS_PER_SECOND);
    const cue = { item, in: cursor, out: cursor + length };
    cursor = cue.out + GAP_SECONDS;
    return cue;
  });
}
