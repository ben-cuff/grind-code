import { SignOutButton } from "@/components/auth/sign-out-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import TogglePremium from "@/components/toggle-premium";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";

export default function SettingsTab() {
	const [token, setToken] = useState("");
	const { themeMode, setThemeMode } = useTheme();
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");
	const { getToken } = useAuth();

	useEffect(() => {
		const fetchToken = async () => {
			const token = await getToken();
			setToken(token || "");
		};
		fetchToken();
	}, [getToken]);

	return (
		<ThemedView style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<ThemedText style={styles.title}>Settings</ThemedText>

				<View style={styles.section}>
					<ThemedText style={styles.sectionTitle}>Theme</ThemedText>
					<View style={styles.themeOptions}>
						<Pressable
							style={[
								styles.themeButton,
								themeMode === "light" && styles.selectedTheme,
								{ backgroundColor: colors.surfaceAlt },
							]}
							onPress={() => setThemeMode("light")}
						>
							<Ionicons name="sunny" size={24} color="#FFB800" />
							<ThemedText style={styles.buttonText}>
								Light
							</ThemedText>
						</Pressable>

						<Pressable
							style={[
								styles.themeButton,
								themeMode === "dark" && styles.selectedTheme,
								{ backgroundColor: colors.surfaceAlt },
							]}
							onPress={() => setThemeMode("dark")}
						>
							<Ionicons name="moon" size={24} color="#6C63FF" />
							<ThemedText style={styles.buttonText}>
								Dark
							</ThemedText>
						</Pressable>

						<Pressable
							style={[
								styles.themeButton,
								themeMode === "system" && styles.selectedTheme,
								{ backgroundColor: colors.surfaceAlt },
							]}
							onPress={() => setThemeMode("system")}
						>
							<Ionicons
								name="settings"
								size={24}
								color="#4CAF50"
							/>
							<ThemedText style={styles.buttonText}>
								System
							</ThemedText>
						</Pressable>
					</View>
				</View>

				<View style={styles.signOutContainer}>
					<TogglePremium token={token} />
					<SignOutButton />
				</View>
			</SafeAreaView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 24,
	},
	section: {
		marginBottom: 24,
		padding: 16,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 16,
	},
	themeOptions: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 12,
	},
	themeButton: {
		flex: 1,
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
	selectedTheme: {
		borderWidth: 2,
		borderColor: "#007AFF",
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "500",
	},
	signOutContainer: {
		marginTop: "auto",
		marginBottom: 16,
	},
});
