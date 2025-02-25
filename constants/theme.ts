export const lightTheme = {
  background: ["#FFFFFF", "#F8F9FA"],
  text: "#2D3436",
  primary: "#007AFF",
  secondary: "#5856D6",
  border: "#E5E5EA",
  card: ["#FFFFFF", "#F8F9FA"],
  surface: "#FFFFFF",
  surfaceAlt: "#F2F2F7",
  tabBar: {
    background: ["#FFFFFF", "#F8F9FA"],
    active: "#007AFF",
    inactive: "#8E8E93",
  },
  button: {
    background: ["#007AFF", "#0A84FF"],
    text: "#FFFFFF",
  },
  modal: {
    background: "rgba(0, 0, 0, 0.5)",
    surface: ["#FFFFFF", "#F8F9FA"],
  },
};

export const darkTheme = {
  background: ["#1A1B1E", "#2C2E33"],
  text: "#E5E5E7",
  primary: "#0A84FF",
  secondary: "#5E5CE6",
  border: "#38383A",
  card: ["#2C2E33", "#1A1B1E"],
  surface: "#2C2E33",
  surfaceAlt: "#1C1C1E",
  tabBar: {
    background: ["#1A1B1E", "#2C2E33"],
    active: "#0A84FF",
    inactive: "#8E8E93",
  },
  button: {
    background: ["#0A84FF", "#0056D6"],
    text: "#FFFFFF",
  },
  modal: {
    background: "rgba(0, 0, 0, 0.7)",
    surface: ["#2C2E33", "#1A1B1E"],
  },
};

export type Theme = typeof lightTheme;

export const getThemeColors = (isDark: boolean) => 
  isDark ? darkTheme : lightTheme; 