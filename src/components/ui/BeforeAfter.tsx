import clsx from "clsx";
import { useMemo, type CSSProperties } from "react";
import { icons, type IconName } from "./icons";
import { formatTimecode } from "./timecode";
import { useAudioAB, useCompareSlider, type Side } from "./useBeforeAfter";
import { normalise, placeholderWaveform } from "./waveform";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface ImageFrame {
  src: string;
  alt: string;
}

interface AudioClip {
  src: string;
  label: string;
}

/** Sources are all-or-nothing; without them the component renders its demo state. */
type ImageModeProps = {
  mode: "image";
  /** [before, after] labels. */
  labels?: readonly [string, string];
  caption?: string;
} & ({ before: ImageFrame; after: ImageFrame } | { before?: undefined; after?: undefined });

type AudioModeProps = {
  mode: "audio";
  waveform?: { before: number[]; after: number[] };
} & ({ before: AudioClip; after: AudioClip } | { before?: undefined; after?: undefined });

export type BeforeAfterProps = ImageModeProps | AudioModeProps;

/* ------------------------------------------------------------------ */
/* Shared bits                                                        */
/* ------------------------------------------------------------------ */

function SvgIcon({ name, className }: { name: IconName; className?: string }) {
  const icon = icons[name];
  const stroke = icon.style === "stroke";
  return (
    <svg
      viewBox="0 0 24 24"
      fill={stroke ? "none" : "currentColor"}
      stroke={stroke ? "currentColor" : undefined}
      strokeWidth={stroke ? 2 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx("size-4 shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      {icon.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const cssVars = (vars: Record<`--${string}`, string | number>): CSSProperties =>
  vars as CSSProperties;

/* ------------------------------------------------------------------ */
/* Image mode — colour grade comparison                               */
/* ------------------------------------------------------------------ */

/** Seconds the slider maps onto for its decorative timecode readout. */
const SCRUB_SECONDS = 4;

const gradeVariants = {
  before: "saturate-30 contrast-75 brightness-110", // flat "log" look
  after: "saturate-125 contrast-110",
} as const;

/** CSS-only stand-in scene (token colours) used until real stills exist. */
function DemoFrame({ grade }: { grade: keyof typeof gradeVariants }) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "absolute inset-0 bg-linear-to-b from-clip-v via-playhead to-ink",
        gradeVariants[grade],
      )}
    >
      <div className="absolute top-1/4 left-3/5 aspect-square w-1/6 rounded-pill bg-paper blur-xs" />
      <svg
        viewBox="0 0 160 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-3/5 w-full text-panel-raised"
        fill="currentColor"
      >
        <path d="M0 50 L22 34 L40 46 L64 22 L88 42 L112 28 L136 44 L160 30 V90 H0Z" />
      </svg>
      <svg
        viewBox="0 0 160 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-2/5 w-full text-ink"
        fill="currentColor"
      >
        <path d="M0 52 L30 36 L58 54 L92 30 L124 50 L160 38 V90 H0Z" />
      </svg>
    </div>
  );
}

function ImageCompare(props: ImageModeProps) {
  const [beforeLabel, afterLabel] = props.labels ?? (["RAW", "GRADED"] as const);
  const { pos, setPos, inputRef, frameHandlers } = useCompareSlider(50);
  const isDemo = props.before === undefined;
  const caption =
    props.caption ??
    (isDemo
      ? "Demo frame: one CSS-generated scene shown flat (log) vs graded. Real stills replace it."
      : undefined);

  return (
    <figure className="flex flex-col gap-3">
      <div
        {...frameHandlers}
        // --pos drives clip-path + handle transform; no layout properties change.
        style={cssVars({ "--pos": `${pos}%` })}
        className="relative isolate aspect-video cursor-ew-resize touch-pan-y overflow-hidden rounded-sm border border-line bg-ink select-none"
      >
        {/* Before: full frame underneath; after: revealed from the left up to --pos */}
        {props.before ? (
          <img
            src={props.before.src}
            alt={props.before.alt}
            draggable={false}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <DemoFrame grade="before" />
        )}
        <div className="absolute inset-0 [clip-path:inset(0_calc(100%-var(--pos))_0_0)]">
          {/* arbitrary clip-path: right inset = 100% − --pos reveals the after layer */}
          {props.after ? (
            <img
              src={props.after.src}
              alt={props.after.alt}
              draggable={false}
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <DemoFrame grade="after" />
          )}
        </div>

        <input
          ref={inputRef}
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.currentTarget.value))}
          aria-label="Compare before and after color grade"
          aria-valuetext={`${Math.round(pos)}% after`}
          className="peer pointer-events-none absolute inset-0 size-full opacity-0"
        />

        {/* Handle: full-width layer translated by --pos so the line sits at the split */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-(--pos) peer-focus-visible:[&>span]:shadow-playhead"
        >
          {/* arbitrary child variant: focus ring is drawn on the line, the input itself is invisible */}
          <span className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-playhead" />
          <span className="absolute top-3 left-0 -translate-x-1/2 rounded-xs bg-playhead px-1.5 py-0.5 font-mono text-label text-ink tabular-nums">
            {formatTimecode((pos / 100) * SCRUB_SECONDS)}
          </span>
          <span className="absolute top-1/2 left-0 grid size-9 -translate-1/2 place-items-center rounded-pill border-2 border-playhead bg-ink/80 text-paper">
            <span className="flex">
              <SvgIcon name="arrow-right" className="size-3 rotate-180" />
              <SvgIcon name="arrow-right" className="size-3" />
            </span>
          </span>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3 rounded-xs bg-ink/70 px-2 py-1 font-mono text-label text-paper"
        >
          {afterLabel}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 bottom-3 rounded-xs bg-ink/70 px-2 py-1 font-mono text-label text-muted"
        >
          {beforeLabel}
        </span>
      </div>
      {caption && <figcaption className="text-body-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Audio mode — A/B toggle                                            */
/* ------------------------------------------------------------------ */

const waveVariants = {
  before: "text-muted",
  after: "text-clip-a",
} as const satisfies Record<Side, string>;

const sideLabels = { before: "Before (raw)", after: "After (cleaned)" } as const;

function Waveform({ values, side }: { values: number[]; side: Side }) {
  const w = values.length * 4;
  return (
    <svg
      viewBox={`0 0 ${w} 40`}
      preserveAspectRatio="none"
      className={clsx("absolute inset-0 size-full", waveVariants[side])}
      fill="currentColor"
      aria-hidden="true"
    >
      {values.map((v, i) => (
        <rect
          key={i}
          x={i * 4 + 0.75}
          y={20 - v * 19}
          width={2.5}
          height={Math.max(v * 38, 1)}
          rx={1}
        />
      ))}
    </svg>
  );
}

function AudioCompare(props: AudioModeProps) {
  const enabled = props.before !== undefined;
  const { active, playing, status, select, toggle, onEnded, refs } = useAudioAB(enabled);

  const waves = useMemo(
    () => ({
      before: normalise(props.waveform?.before ?? placeholderWaveform("noisy")),
      after: normalise(props.waveform?.after ?? placeholderWaveform("clean")),
    }),
    [props.waveform],
  );

  const labelFor = (side: Side): string => props[side]?.label ?? sideLabels[side];

  return (
    <div className="flex flex-col gap-4 rounded-sm border border-line bg-panel p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Audio version"
          className="inline-flex rounded-sm border border-line bg-ink p-0.5"
        >
          {(["before", "after"] as const).map((side) => (
            <button
              key={side}
              type="button"
              aria-pressed={active === side}
              onClick={() => select(side)}
              className={clsx(
                "rounded-xs px-3 py-1.5 font-mono text-label uppercase motion-safe:transition-colors motion-safe:duration-(--duration-fast) motion-safe:ease-cut",
                active === side ? "bg-panel-raised text-paper" : "text-muted hover:text-paper",
              )}
            >
              {labelFor(side)}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={toggle}
          disabled={!enabled}
          className="inline-flex h-9 items-center gap-2 rounded-sm bg-playhead px-4 text-body-sm font-medium text-ink hover:bg-playhead-hover disabled:cursor-not-allowed disabled:bg-panel-raised disabled:text-muted motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
        >
          <SvgIcon name={playing ? "pause" : "play"} />
          {enabled ? (playing ? "Pause" : "Play") : "Sample coming soon"}
        </button>
      </div>

      <div
        ref={refs.progressRef}
        style={cssVars({ "--progress": 0 })}
        className="relative h-20 overflow-hidden rounded-xs border border-line bg-ink"
      >
        <span
          className="absolute top-1.5 left-2 font-mono text-label text-muted"
          aria-hidden="true"
        >
          A1
        </span>
        <div className="absolute inset-x-2 inset-y-3">
          <Waveform values={waves[active]} side={active} />
        </div>
        {/* Played region + playhead, both transform-only */}
        <div
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-(--progress) bg-playhead/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-[calc(var(--progress)*100%)]"
        >
          {/* arbitrary translate: --progress is unitless 0–1, so scale it to a percentage */}
          <span className="absolute inset-y-0 left-0 w-px bg-playhead" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 font-mono text-label text-muted">
        <span ref={refs.timeRef} aria-hidden="true" className="tabular-nums">
          {formatTimecode(0)}
        </span>
        <span>{enabled ? labelFor(active) : "Sample coming soon · placeholder waveform"}</span>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>

      {props.before && (
        <>
          <audio ref={refs.beforeRef} src={props.before.src} preload="none" onEnded={onEnded} />
          <audio ref={refs.afterRef} src={props.after.src} preload="none" onEnded={onEnded} />
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function BeforeAfter(props: BeforeAfterProps) {
  return props.mode === "image" ? <ImageCompare {...props} /> : <AudioCompare {...props} />;
}
