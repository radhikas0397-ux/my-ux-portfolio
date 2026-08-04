/**
 * Drop-in avatar asset configuration.
 *
 * Replace paths below when your illustrated avatar layers are ready.
 * Only `base` is required — all other layers are optional overlays.
 *
 * Recommended layer exports from your illustration tool:
 * - base.png   — body + face (default expression, eyes open)
 * - hair.png   — hair on transparent background (for sway)
 * - blink.png  — closed eyes overlay (same dimensions as base)
 * - smile.png  — smile overlay (shown on hover/focus)
 * - hand.png   — right hand on transparent background (for wave)
 * - pupils.png — pupil layer (for cursor eye tracking; optional)
 */
export type AvatarLayerConfig = {
  base: string;
  hair?: string;
  blink?: string;
  smile?: string;
  hand?: string;
  pupils?: string;
};

/** Default paths — swap `base` when your avatar asset is ready */
export const AVATAR_LAYERS: AvatarLayerConfig = {
  base: "/images/hero-portrait-blend.png",
  // hair: "/images/hero-avatar/hair.png",
  // blink: "/images/hero-avatar/blink.png",
  // smile: "/images/hero-avatar/smile.png",
  // hand: "/images/hero-avatar/hand.png",
  // pupils: "/images/hero-avatar/pupils.png",
};

/** Percentage-based anchors for CSS fallback eye tracking (no pupil layer) */
export const AVATAR_EYE_ANCHORS = {
  left: { x: 38, y: 32 },
  right: { x: 52, y: 32 },
} as const;

export const AVATAR_ALT =
  "Radhika Sharma, UI/UX designer — illustrated avatar";

export const AVATAR_ASPECT = "4 / 5" as const;
