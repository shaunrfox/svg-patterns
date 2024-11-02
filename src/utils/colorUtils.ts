const colors = [
  "#C6E4FF",
  "#A9CBFF",
  "#8BB2FF",
  "#6C9AFF",
  "#4883FF",
  "#0D6DFD",
  "#0058E3",
  "#003FC4",
  "#0031B0",
  "#002097",
  "#00117F",
  "#FBBF24",
];

let currentColorSubset: string[] = [];

export function updateColorSubset(colorCount: number) {
  const shuffled = [...colors].sort(() => Math.random() - 0.5);
  currentColorSubset = shuffled.slice(0, colorCount);
}

export function getRandomColorFromSubset(colorCount: number): string {
  return currentColorSubset[Math.floor(Math.random() * colorCount)];
}
