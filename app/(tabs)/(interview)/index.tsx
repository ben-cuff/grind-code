import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { useAuth } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Interview {
	id: string;
	completed: boolean;
	createdAt: string;
	questionNumber: number;
}

export default function InterviewTab() {
	const router = useRouter();
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");
	const [interviews, setInterviews] = useState<Interview[]>([]);
	const { getToken } = useAuth();

	useEffect(() => {
		fetchInterviews();
	}, []);

	const fetchInterviews = async () => {
		try {
			const token = await getToken();
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/interview`,
				{
					headers: {
						method: "GET",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			console.log(data);
			setInterviews(data);
		} catch (error) {
			console.error("Failed to fetch interviews:", error);
		}
	};

	return (
		<ThemedView style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<ThemedText style={styles.title}>Interview</ThemedText>
					<Pressable
						style={styles.buttonWrapper}
						onPress={() =>
							router.push("/(tabs)/(interview)/interview-chat")
						}
					>
						<LinearGradient
							colors={[
								colors.button.background[0],
								colors.button.background[1],
							]}
							style={styles.button}
						>
							<ThemedText style={styles.buttonText}>
								Start New Interview
							</ThemedText>
						</LinearGradient>
					</Pressable>

					<ThemedText style={styles.sectionTitle}>
						In Progress
					</ThemedText>
					{interviews
						.filter((interview) => !interview.completed)
						.map((interview) => (
							<Pressable
								key={interview.id}
								style={[styles.buttonWrapper, { marginTop: 8 }]}
								onPress={() => router.push(`/${interview.id}`)}
							>
								<LinearGradient
									colors={[
										colors.button.background[0],
										colors.button.background[1],
									]}
									style={styles.button}
								>
									<ThemedText style={styles.buttonText}>
										Question {interview.questionNumber} -{" "}
										{new Date(
											interview.createdAt
										).toLocaleDateString()}
									</ThemedText>
								</LinearGradient>
							</Pressable>
						))}

					<ThemedText style={styles.sectionTitle}>
						Completed
					</ThemedText>
					{interviews
						.filter((interview) => interview.completed)
						.map((interview) => (
							<Pressable
								key={interview.id}
								style={[styles.buttonWrapper, { marginTop: 8 }]}
								onPress={() => router.push(`/${interview.id}`)}
							>
								<LinearGradient
									colors={[
										colors.button.background[0],
										colors.button.background[1],
									]}
									style={styles.button}
								>
									<ThemedText style={styles.buttonText}>
										Question {interview.questionNumber} -{" "}
										{new Date(
											interview.createdAt
										).toLocaleDateString()}
									</ThemedText>
								</LinearGradient>
							</Pressable>
						))}
				</ScrollView>
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
	sectionTitle: {
		fontSize: 24,
		marginTop: 24,
		marginBottom: 16,
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
