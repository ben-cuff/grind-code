import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/context/theme-context";
import { getThemeColors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

export default function InterviewTab() {
	const router = useRouter();
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	return (
		<ThemedView style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<ThemedText style={styles.title}>Interview</ThemedText>
				<Pressable
					style={styles.buttonWrapper}
					onPress={() => router.push("/(tabs)/(interview)/interview-chat")}
				>
					<LinearGradient
						colors={[colors.button.background[0], colors.button.background[1]]}
						style={styles.button}
					>
						<ThemedText style={styles.buttonText}>Start Interview</ThemedText>
					</LinearGradient>
				</Pressable>
			</SafeAreaView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	title: {
		fontSize: 48,
		textAlign: "center",
		marginBottom: 24,
	},
	buttonWrapper: {
		width: "100%",
		maxWidth: 300,
		alignSelf: "center",
	},
	button: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
