import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.tabBar.inactive,
				tabBarStyle: {
					backgroundColor: colors.surfaceAlt,
					borderTopColor: colors.border,
				},
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
				name="learn"
				options={{
					title: "Learn",
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name={"repeat"} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="(interview)"
				options={{
					title: "Interview",
					tabBarIcon: ({ color, focused }) => (
						<View
							style={{
								height: 50,
								width: 50,
								borderRadius: 1000,
								borderWidth: 1,
								borderColor: color,
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: colors.surfaceAlt,
								marginBottom: 20,
							}}
						>
							<Ionicons
								size={40}
								name={
									focused
										? "chatbubbles"
										: "chatbubbles-outline"
								}
								color={color}
							/>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="(practice)"
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
