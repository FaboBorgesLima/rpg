export function nFactorial(n: number): number {
  if (n <= 0) return 1;
  return (Math.trunc(n) * (Math.trunc(n) + 1)) / 2;
}
