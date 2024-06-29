export interface Effect {
  deltaLife: number;
  deltaStamina: number;
  runAway: boolean;
}

export function getDefaultEffect(): Effect {
  return { deltaLife: 0, deltaStamina: 0, runAway: false };
}
