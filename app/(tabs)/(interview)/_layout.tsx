import { Stack } from "expo-router";

export default function InterviewLayout() {
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
