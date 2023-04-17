export const createColorFromHash = (hash) => {
  const value = hash.split('').reduce((a, c) => a + c.charCodeAt(0), 0);

  const hue = (value * 137.5) % 360;
  const saturation = 70;
  const lightness = 75;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
