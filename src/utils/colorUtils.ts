export const colors = [
  [
    "#C6E4FF",
    "#A9CBFF",
    "#8BB2FF",
    "#6C9AFF",
    "#4883FF",
    "#0D6DFD",
    "#0058E3",
    "#0031B0",
    "#00117F",
    "#FBBF24",
  ],
  [
    "#5b2874",
    "#7f5893",
    "#a488b2",
    "#c8b7d1",
    "#ede7f0",
    "#fae6e7",
    "#f1b4b7",
    "#e88386",
    "#df5156",
    "#d61f26",
  ],
  [
    "#006466",
    "#065A60",
    "#0B525B",
    "#144552",
    "#1B3A4B",
    "#212F45",
    "#272640",
    "#312244",
    "#3E1F47",
    "#4D194D",
  ],
  [
    "#001219",
    "#005f73",
    "#0a9396",
    "#94d2bd",
    "#e9d8a6",
    "#ee9b00",
    "#ca6702",
    "#bb3e03",
    "#ae2012",
    "#9b2226",
  ],
  [
    "#f72585",
    "#b5179e",
    "#7209b7",
    "#560bad",
    "#480ca8",
    "#3a0ca3",
    "#3f37c9",
    "#4361ee",
    "#4895ef",
    "#4cc9f0",
  ],
  [
    "#d9ed92",
    "#b5e48c",
    "#99d98c",
    "#76c893",
    "#52b69a",
    "#34a0a4",
    "#168aad",
    "#1a759f",
    "#1e6091",
    "#184e77",
  ],
  [
    "#ffb950",
    "#ffad33",
    "#ff931f",
    "#ff7e33",
    "#fa5e1f",
    "#ec3f13",
    "#b81702",
    "#a50104",
    "#8e0103",
    "#7a0103",
  ],
  [
    "#a172fd",
    "#a77afe",
    "#ac82fe",
    "#b691fe",
    "#c1a0fe",
    "#cbaffe",
    "#d6bffe",
    "#e0cefe",
    "#ebddfe",
    "#f5ecfe",
  ],
];

export const currentColorSubsets: { [key: number]: string[] } = {};

export function updateColorSubset(
  colorCount: number,
  colorSetIndex: number = 0
) {
  const colorSet = colors[colorSetIndex] || colors[0];
  const shuffled = [...colorSet].sort(() => Math.random() - 0.5);
  currentColorSubsets[colorSetIndex] = shuffled.slice(0, colorCount);
}

export function getRandomColorFromSubset(
  colorCount: number,
  colorSetIndex: number = 0
): string {
  const subset = currentColorSubsets[colorSetIndex] || [];
  return subset[Math.floor(Math.random() * colorCount)];
}
