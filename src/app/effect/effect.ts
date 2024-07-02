export interface Effect {
  deltaLife: number;
  deltaStamina: number;
  runAway: boolean;
  deltaStrength: number;
  deltaSpeed: number;
  deltaDefense: number;
}

export function getDefaultEffect(): Effect {
  return {
    deltaLife: 0,
    deltaStamina: 0,
    runAway: false,
    deltaStrength: 0,
    deltaSpeed: 0,
    deltaDefense: 0,
  };
}

export function sumEffects(x: Effect, y: Effect): Effect {
  return {
    deltaDefense: x.deltaDefense + y.deltaDefense,
    deltaLife: x.deltaLife + y.deltaLife,
    deltaSpeed: x.deltaSpeed + y.deltaSpeed,
    deltaStamina: x.deltaStamina + y.deltaStamina,
    deltaStrength: x.deltaStrength + y.deltaStrength,
    runAway: x.runAway || y.runAway,
  };
}
