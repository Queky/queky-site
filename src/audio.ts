import { useEffect, useState } from "react";

export type SfxKind = "coin" | "hit" | "takeoff" | "land" | "crash";

const SEMITONES: Record<string, number> = {
  C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
};

function hz(note: string): number {
  const m = /^([A-G]#?)(\d)$/.exec(note);
  if (!m) return 440;
  const midi = (Number(m[2]) + 1) * 12 + SEMITONES[m[1]];
  return 440 * 2 ** ((midi - 69) / 12);
}

// 16-bar chill nocturnal-sky chiptune loop in D major (~104 BPM, 8th-note steps).
const STEP_SEC = 60 / 104 / 2;

interface Bar {
  lead: (string | null)[];
  arp: [string, string, string, string];
  bass: [string, string];
}

const SONG: Bar[] = [
  // Section A — starry night sky
  { lead: ["A4", "D5", "F#5", null, "E5", "D5", "C#5", null], arp: ["D4", "F#4", "A4", "C#5"], bass: ["D3", "A2"] },
  { lead: ["B4", null, "D5", "F#5", "E5", null, "D5", null], arp: ["B3", "D4", "F#4", "A4"], bass: ["B2", "F#2"] },
  { lead: ["B4", "D5", "G5", null, "F#5", "E5", "D5", null], arp: ["G3", "B3", "D4", "F#4"], bass: ["G2", "D3"] },
  { lead: ["E5", null, "C#5", null, "A4", null, null, null], arp: ["A3", "C#4", "E4", "A4"], bass: ["A2", "E3"] },
  { lead: ["A4", "D5", "F#5", null, "A5", "G5", "F#5", null], arp: ["D4", "F#4", "A4", "C#5"], bass: ["D3", "A2"] },
  { lead: ["E5", null, "C#5", "E5", "F#5", null, "C#5", null], arp: ["F#3", "A3", "C#4", "E4"], bass: ["F#2", "C#3"] },
  { lead: ["D5", "E5", "F#5", "G5", "F#5", "E5", "D5", "B4"], arp: ["G3", "B3", "D4", "F#4"], bass: ["G2", "D3"] },
  { lead: ["E5", null, "D5", null, "C#5", null, null, null], arp: ["A3", "D4", "E4", "C#4"], bass: ["A2", "E3"] },
  // Section B — gliding above the clouds
  { lead: ["G5", null, "F#5", "E5", "D5", null, "B4", null], arp: ["G3", "B3", "D4", "F#4"], bass: ["G2", "D3"] },
  { lead: ["A5", null, "G5", "F#5", "E5", null, "C#5", null], arp: ["A3", "C#4", "E4", "G4"], bass: ["A2", "E3"] },
  { lead: ["F#5", null, "E5", "D5", "C#5", null, "A4", "C#5"], arp: ["F#3", "A3", "C#4", "E4"], bass: ["F#2", "C#3"] },
  { lead: ["D5", null, "F#5", null, "B4", null, null, null], arp: ["B3", "D4", "F#4", "A4"], bass: ["B2", "F#2"] },
  { lead: ["E5", "F#5", "G5", null, "F#5", "E5", "D5", null], arp: ["E3", "G3", "B3", "D4"], bass: ["E3", "B2"] },
  { lead: ["F#5", "E5", "F#5", "A5", null, "F#5", "E5", null], arp: ["F#3", "A3", "C#4", "E4"], bass: ["F#2", "C#3"] },
  { lead: ["G5", "A5", "B5", null, "A5", "G5", "F#5", "E5"], arp: ["G3", "B3", "D4", "F#4"], bass: ["G2", "D3"] },
  { lead: ["E5", null, null, "D5", "C#5", null, "A4", null], arp: ["A3", "D4", "E4", "C#4"], bass: ["A2", "E3"] },
];

const ARP_ORDER = [0, 1, 2, 3, 2, 1, 2, 3];
const TOTAL_STEPS = SONG.length * 8;

let ctx: AudioContext | null = null;
let bus: AudioNode | null = null;
let master: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let enabled = false;
let step = 0;
let nextTime = 0;
let timer: number | null = null;
let visBound = false;
const listeners = new Set<(on: boolean) => void>();

function notify() {
  listeners.forEach(fn => fn(enabled));
}

function ensureContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) {
    ctx = new Ctor();
    // Warm CRT-like low-pass filter so square waves stay mellow and pleasant.
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 4200;
    master = ctx.createGain();
    master.gain.value = 0;
    filter.connect(master);
    master.connect(ctx.destination);
    bus = filter;

    // Pre-generate 80ms of white noise for soft retro hi-hat ticks & hit SFX.
    noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.08), ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    if (!visBound) {
      visBound = true;
      document.addEventListener("visibilitychange", () => {
        if (!ctx || !enabled) return;
        if (document.hidden) {
          void ctx.suspend();
        } else {
          nextTime = ctx.currentTime + 0.06;
          void ctx.resume();
        }
      });
    }
  }
  return ctx;
}

function tone(
  ac: AudioContext,
  type: OscillatorType,
  freq: number,
  start: number,
  dur: number,
  vol: number,
  slideTo?: number,
) {
  if (!bus) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (slideTo !== undefined) osc.frequency.exponentialRampToValueAtTime(slideTo, start + dur);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(vol, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, vol * 0.45), start + dur * 0.65);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(gain);
  gain.connect(bus);
  osc.start(start);
  osc.stop(start + dur + 0.015);
}

function hat(ac: AudioContext, start: number, vol: number) {
  if (!bus || !noiseBuf) return;
  const src = ac.createBufferSource();
  src.buffer = noiseBuf;
  const hp = ac.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 6500;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(vol, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.025);
  src.connect(hp);
  hp.connect(gain);
  gain.connect(bus);
  src.start(start);
  src.stop(start + 0.03);
}

function scheduleStep(ac: AudioContext, idx: number, time: number) {
  const bar = SONG[Math.floor(idx / 8)];
  const beat = idx % 8;

  // 1. Lead melody (warm square)
  const leadNote = bar.lead[beat];
  if (leadNote) {
    // Hold slightly longer if the next slot is a rest so phrases breathe.
    const nextIsRest = beat < 7 && bar.lead[beat + 1] === null;
    const dur = nextIsRest ? STEP_SEC * 1.75 : STEP_SEC * 0.9;
    tone(ac, "square", hz(leadNote), time, dur, 0.07);
  }

  // 2. Twinkling arpeggio backing (soft square)
  const arpNote = bar.arp[ARP_ORDER[beat]];
  tone(ac, "square", hz(arpNote), time, STEP_SEC * 0.55, 0.024);

  // 3. NES triangle bass on beats 0, 3, 4, 6
  if (beat === 0 || beat === 4) tone(ac, "triangle", hz(bar.bass[0]), time, STEP_SEC * 1.6, 0.16);
  else if (beat === 3 || beat === 6) tone(ac, "triangle", hz(bar.bass[1]), time, STEP_SEC * 1.1, 0.13);

  // 4. Subtle brushed hi-hat on off-beats
  if (beat % 2 === 1) hat(ac, time, beat === 3 || beat === 7 ? 0.018 : 0.01);
}

function tick() {
  if (!ctx || !enabled || document.hidden) return;
  while (nextTime < ctx.currentTime + 0.14) {
    scheduleStep(ctx, step, nextTime);
    nextTime += STEP_SEC;
    step = (step + 1) % TOTAL_STEPS;
  }
}

export function isAudioOn() {
  return enabled;
}

export function toggleAudio(): boolean {
  const ac = ensureContext();
  if (!ac || !master) return false;

  enabled = !enabled;
  const now = ac.currentTime;
  master.gain.cancelScheduledValues(now);

  if (enabled) {
    if (ac.state === "suspended") void ac.resume();
    master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), now);
    master.gain.linearRampToValueAtTime(0.8, now + 0.08);
    nextTime = now + 0.05;
    if (timer === null) timer = window.setInterval(tick, 45);
    tick();
  } else {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0.0001, now + 0.08);
  }

  notify();
  return enabled;
}

export function playSfx(kind: SfxKind) {
  if (!enabled || !ctx || !bus) return;
  const now = ctx.currentTime;

  switch (kind) {
    case "coin":
      tone(ctx, "square", hz("B5"), now, 0.055, 0.11);
      tone(ctx, "square", hz("E6"), now + 0.055, 0.13, 0.11);
      break;
    case "hit":
      tone(ctx, "sawtooth", hz("A3"), now, 0.14, 0.13, hz("C3"));
      hat(ctx, now, 0.07);
      break;
    case "takeoff":
      tone(ctx, "square", hz("D5"), now, 0.05, 0.09);
      tone(ctx, "square", hz("F#5"), now + 0.05, 0.05, 0.09);
      tone(ctx, "square", hz("A5"), now + 0.1, 0.11, 0.09);
      break;
    case "land":
      tone(ctx, "square", hz("D5"), now, 0.07, 0.1);
      tone(ctx, "square", hz("F#5"), now + 0.07, 0.07, 0.1);
      tone(ctx, "square", hz("A5"), now + 0.14, 0.07, 0.1);
      tone(ctx, "square", hz("D6"), now + 0.21, 0.24, 0.11);
      break;
    case "crash":
      tone(ctx, "square", hz("A4"), now, 0.09, 0.11);
      tone(ctx, "square", hz("G4"), now + 0.09, 0.09, 0.11);
      tone(ctx, "square", hz("F#4"), now + 0.18, 0.09, 0.11);
      tone(ctx, "square", hz("D4"), now + 0.27, 0.25, 0.11, hz("B3"));
      break;
  }
}

export function useAudio() {
  const [on, setOn] = useState(enabled);
  useEffect(() => {
    listeners.add(setOn);
    return () => { listeners.delete(setOn); };
  }, []);
  return { on, toggle: toggleAudio };
}
