import { NumberTuple, Point, Tuple } from "./types.js";

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function lcm(...numbers: number[]): number {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

export function transpose(matrix: string[][]): string[][] {
  return matrix[0].map((_, col) => matrix.map(row => row[col]));
}

export function arrayEquals<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

// Shoelace formula (https://en.wikipedia.org/wiki/Shoelace_formula)
export function shoelaceArea(points: Point[]): number {
  let area = 0;
  for (let i = 0; i < points.length - 1; i++) {
    area += points[i][0] * points[i + 1][1] - points[i + 1][0] * points[i][1];
  }
  return Math.abs(area / 2);
}

// Pick's theorem (https://en.wikipedia.org/wiki/Pick%27s_theorem)
// Requires that boundary includes "both vertices and points along the sides", assuming that means all points, not just corners
export function interiorPoints(points: Point[]): number {
  const area = shoelaceArea(points);
  // Assume points is a "loop" (start = end), required for correct shoelace area
  const boundary = points.length - 1;
  return area - boundary / 2 + 1;
}

export function polygonPerimeter(points: Point[]): number {
  let perimeter = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    perimeter += Math.abs(x2 - x1) + Math.abs(y2 - y1);
  }
  return perimeter;
}

export function solveTwoLinearEqs(
  eqs: Tuple<NumberTuple<3>, 2>,
): Tuple<number, 2> | undefined {
  const [a1, b1, c1] = eqs[0];
  let [a2, b2, c2] = eqs[1];

  const factor = -a2 / a1;
  eqs[1] = eqs[1].map((n, i) => n + eqs[0][i] * factor) as NumberTuple<3>;
  [a2, b2, c2] = eqs[1];

  if (a2 === 0 && b2 === 0) {
    return undefined;
  }

  // Now a2 = 0, thus b2 * b = c2
  const b = c2 / b2;
  // And a1 * a + b1 * b = c1
  const a = (c1 - b1 * b) / a1;

  return [a, b];
}
