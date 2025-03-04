// app/_layout.tsx
import { tokenCache } from "@/cache";
import { getThemeColors } from "@/constants/theme";
import { ThemeProvider, useTheme } from "@/context/theme-context";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";

function LayoutContent() {
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	return (
		<Stack
			screenOptions={({ route }) => ({
				headerShown: route.name !== "index",
				headerTitle: "",
				headerBackTitle: "",
				headerStyle: {
					backgroundColor: colors.surfaceAlt,
				},
			})}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<ClerkProvider
			publishableKey={process.env.publishableKey!}
			tokenCache={tokenCache}
		>
			<ClerkLoaded>
				<ThemeProvider>
					<LayoutContent />
				</ThemeProvider>
			</ClerkLoaded>
		</ClerkProvider>
	);
}
