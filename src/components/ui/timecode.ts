import { TIMECODE_FPS } from "../../lib/motion";

const pad = (n: number): string => String(n).padStart(2, "0");

/** Formats seconds as an SMPTE-style `HH:MM:SS:FF` timecode (non-drop-frame). */
export function formatTimecode(seconds: number, fps: number = TIMECODE_FPS): string {
  const totalFrames = Math.max(0, Math.round(seconds * fps));
  const frames = totalFrames % fps;
  const totalSeconds = Math.floor(totalFrames / fps);
  const s = totalSeconds % 60;
  const m = Math.floor(totalSeconds / 60) % 60;
  const h = Math.floor(totalSeconds / 3600);
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(frames)}`;
}
