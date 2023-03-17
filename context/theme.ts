import { createContext, useContext } from "react";

export interface ThemePreferenceType {
  theme: string;
}

export const ThemeContext = createContext<ThemePreferenceType>({
  theme: "Light",
});
