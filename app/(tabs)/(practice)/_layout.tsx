import { Stack } from "expo-router";

export default function PracticeLayout() {
	return (
		<Stack
			screenOptions={({ route }) => ({
				headerShown: route.name !== "index",
				headerTitle: "",
				headerBackTitle: "",
			})}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
