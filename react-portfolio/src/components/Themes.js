// Theme tokens for styled-components

export const lightTheme = {
  body: "#FCF6F4",
  text: "#000000",
  fontFamily: "'Source Sans Pro', sans-serif",
  bodyRgba: "252, 246, 244",
  textRgba: "0,0,0",
};

export const DarkTheme = {
  body: "#000000",
  text: "#FCF6F4",
  fontFamily: "'Source Sans Pro', sans-serif",
  textRgba: "252, 246, 244",
  bodyRgba: "0,0,0",
};

/** Primary site theme — editorial scroll story (Tomo × dozfx) */
export const storyTheme = {
  body: "#0a0908",
  text: "#f2ebe3",
  muted: "#9a9189",
  accent: "#e8c4a8",
  accent2: "#c4b5fd",
  beam: "#faf8f5",
  accentRgb: "232, 196, 168",
  accent2Rgb: "196, 181, 253",
  fontFamily: "'Space Grotesk', 'Source Sans Pro', sans-serif",
  serif: "'Source Sans Pro', Georgia, serif",
  mono: "'JetBrains Mono', 'Ubuntu Mono', monospace",
  bodyRgba: "10, 9, 8",
  textRgba: "242, 235, 227",
  glass: "rgba(20, 18, 16, 0.65)",
  glassBorder: "rgba(242, 235, 227, 0.12)",
  sectionTints: [
    "#0a0908",
    "#0c0b0a",
    "#0e0d0c",
    "#10100e",
    "#0b0c10",
    "#0d0e12",
    "#0a0908",
    "#0c0b0a",
    "#0a0908",
  ],
};

/** @deprecated — kept for secondary routes until migrated */
export const futuristicTheme = storyTheme;
