import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { formatTimecode } from "./timecode";

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

/**
 * Comparison slider state. The frame owns pointer input (drag anywhere,
 * vertical scroll still allowed via touch-action: pan-y); the native range
 * input owns keyboard + assistive tech. Both write the same `pos` (0–100).
 */
export function useCompareSlider(initial = 50) {
  const [pos, setPos] = useState(initial);
  const inputRef = useRef<HTMLInputElement>(null);

  const fromPointer = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setPos(Math.round(clamp(pct, 0, 100) * 10) / 10);
  }, []);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      inputRef.current?.focus({ preventScroll: true });
      fromPointer(e);
    },
    [fromPointer],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e);
    },
    [fromPointer],
  );

  return { pos, setPos, inputRef, frameHandlers: { onPointerDown, onPointerMove } };
}

export type Side = "before" | "after";

const statusNoun = { before: "raw audio", after: "cleaned audio" } as const satisfies Record<
  Side,
  string
>;

/**
 * A/B audio: two <audio preload="none"> elements, one play/pause button.
 * Switching sides carries the playback position over. Progress is written to
 * a CSS variable (`--progress`, 0–1) on `progressRef` via rAF — no re-renders.
 */
export function useAudioAB(enabled: boolean) {
  const beforeRef = useRef<HTMLAudioElement>(null);
  const afterRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<Side>("before");
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState("");

  const audioFor = useCallback(
    (side: Side): HTMLAudioElement | null =>
      side === "before" ? beforeRef.current : afterRef.current,
    [],
  );

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = (): void => {
      const audio = audioFor(active);
      if (audio && progressRef.current) {
        const ratio = audio.duration > 0 ? audio.currentTime / audio.duration : 0;
        progressRef.current.style.setProperty("--progress", String(ratio));
        if (timeRef.current) timeRef.current.textContent = formatTimecode(audio.currentTime);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, active, audioFor]);

  useEffect(
    () => () => {
      beforeRef.current?.pause();
      afterRef.current?.pause();
    },
    [],
  );

  const play = useCallback(
    (side: Side) => {
      const audio = audioFor(side);
      if (!audio) return;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setStatus(`Playing ${statusNoun[side]}`);
        })
        .catch((error: unknown) => {
          // A quick pause() rejects the pending play() with AbortError — not a failure.
          if (error instanceof DOMException && error.name === "AbortError") return;
          setPlaying(false);
          setStatus("Playback failed");
        });
    },
    [audioFor],
  );

  const toggle = useCallback(() => {
    if (!enabled) return;
    const audio = audioFor(active);
    if (!audio) return;
    if (audio.paused) {
      play(active);
    } else {
      audio.pause();
      setPlaying(false);
      setStatus(`Paused ${statusNoun[active]}`);
    }
  }, [enabled, active, audioFor, play]);

  const select = useCallback(
    (side: Side) => {
      if (side === active) return;
      setActive(side);
      const from = audioFor(active);
      const to = audioFor(side);
      if (!enabled || !from || !to) return;
      // Before metadata loads this sets the default start position, applied on load.
      to.currentTime = from.currentTime;
      if (from.paused) {
        setStatus(`Switched to ${statusNoun[side]}`);
      } else {
        from.pause();
        play(side);
      }
    },
    [active, enabled, audioFor, play],
  );

  const onEnded = useCallback(() => {
    setPlaying(false);
    setStatus(`Finished ${statusNoun[active]}`);
  }, [active]);

  return {
    active,
    playing,
    status,
    select,
    toggle,
    onEnded,
    refs: { beforeRef, afterRef, progressRef, timeRef },
  };
}
