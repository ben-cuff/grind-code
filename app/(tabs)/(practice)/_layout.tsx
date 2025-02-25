import { useTheme } from "@/context/theme-context";
import { getThemeColors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function PracticeLayout() {
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	return (
		<Stack
			screenOptions={({ route }) => ({
				headerShown: route.name !== "index",
				headerTitle: "",
				headerBackTitle: "",
				headerStyle: {
					backgroundColor: colors.surface,
				},
				headerTintColor: colors.text,
			})}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
