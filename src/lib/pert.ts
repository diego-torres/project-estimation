export function pertExpected(best: number, most: number, worst: number) {
  return (best + 4 * most + worst) / 6;
}
export function pertStdDev(best: number, worst: number) {
  return (worst - best) / 6;
}
export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);