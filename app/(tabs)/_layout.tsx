import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "blue",
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							size={28}
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="practice"
				options={{
					title: "Practice",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							size={28}
							name={focused ? "book" : "book-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="interview"
				options={{
					title: "Interview",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							size={28}
							name={
								focused ? "chatbubbles" : "chatbubbles-outline"
							}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							size={28}
							name={focused ? "settings" : "settings-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
