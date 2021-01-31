namespace Firework {
  export function randomNumberFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}