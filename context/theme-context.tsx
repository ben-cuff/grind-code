import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
	theme: "light" | "dark";
	themeMode: ThemeMode;
	setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const systemColorScheme = useColorScheme();
	const [themeMode, setThemeModeState] = useState<ThemeMode>("system");

	useEffect(() => {
		// Load saved theme mode on app start
		const loadThemeMode = async () => {
			try {
				const savedMode = await SecureStore.getItemAsync("themeMode");
				if (savedMode) {
					setThemeModeState(savedMode as ThemeMode);
				}
			} catch (error) {
				console.error("Error loading theme mode:", error);
			}
		};

		loadThemeMode();
	}, []);

	const setThemeMode = async (mode: ThemeMode) => {
		try {
			setThemeModeState(mode);
			await SecureStore.setItemAsync("themeMode", mode);
		} catch (error) {
			console.error("Error saving theme mode:", error);
		}
	};

	// Determine actual theme based on mode and system preference
	const theme =
		themeMode === "system" ? systemColorScheme || "light" : themeMode;

	return (
		<ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
