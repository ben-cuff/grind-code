import Accordion from "@/components/accordion";
import InterviewButton from "@/components/interview/interview-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { useAuth } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Interview {
	id: string;
	completed: boolean;
	updatedAt: string;
	questionNumber: number;
}

interface User {
	createdAt: string;
	email: string;
	id: string;
	lastLogin: string;
	premium: boolean;
	updatedAt: string;
}

interface Usage {
	askAIUsage: number;
	interviewUsage: number;
	askAILast: Date | null;
	interviewLast: Date | null;
}
export default function InterviewTab() {
	const router = useRouter();
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");
	const [interviews, setInterviews] = useState<Interview[]>([]);
	const [usage, setUsage] = useState<Usage | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const { getToken } = useAuth();
	const { userId } = useAuth();

	useEffect(() => {
		fetchInterviews();
	}, []);

	useFocusEffect(
		useCallback(() => {
			fetchInterviews();
		}, [])
	);

	const fetchInterviews = async () => {
		try {
			const token = await getToken();

			const [interviewsData, usageData, userData] = await Promise.all([
				fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/interview`, {
					method: "GET",
					headers: { Authorization: `Bearer ${token}` },
				}).then((res) => res.json()),

				fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/usage`, {
					method: "GET",
					headers: { Authorization: `Bearer ${token}` },
				}).then((res) => res.json()),

				fetch(
					`${process.env.EXPO_PUBLIC_BASE_URL}/accounts/${userId}`,
					{
						method: "GET",
					}
				).then((res) => res.json()),
			]);

			interviewsData.sort(
				(a: Interview, b: Interview) =>
					new Date(b.updatedAt).getTime() -
					new Date(a.updatedAt).getTime()
			);

			setUser(userData);
			setUsage(usageData);
			setInterviews(interviewsData);
		} catch (error) {
			console.error("Failed to fetch interviews:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ThemedView style={{ flex: 1 }}>
			{loading ? (
				<SafeAreaView style={styles.container}>
					<View
						style={{
							flex: 1,
							alignContent: "center",
							justifyContent: "center",
						}}
					>
						<ActivityIndicator size={"large"} />
						<ThemedText
							style={{
								marginTop: 10,
								fontSize: 16,
								textAlign: "center",
							}}
						>
							Loading...
						</ThemedText>
					</View>
				</SafeAreaView>
			) : (
				<SafeAreaView style={styles.container}>
					<ScrollView>
						<ThemedText style={styles.title}>Interview</ThemedText>
						<Pressable
							style={[
								styles.buttonWrapper,
								((user?.premium &&
									usage?.interviewUsage! >= 10) ||
									(!user?.premium &&
										usage?.interviewUsage! >= 1)) && {
									opacity: 0.5,
								},
							]}
							onPress={() => {
								if (
									(user?.premium &&
										usage?.interviewUsage! < 10) ||
									(!user?.premium &&
										usage?.interviewUsage! < 1)
								) {
									router.push("/interview-chat");
								}
							}}
						>
							<LinearGradient
								colors={[
									colors.button.background[0],
									colors.button.background[1],
								]}
								style={styles.button}
							>
								<ThemedText style={styles.buttonText}>
									{(user?.premium &&
										usage?.interviewUsage! >= 10) ||
									(!user?.premium &&
										usage?.interviewUsage! >= 1)
										? "Usage Limit Reached"
										: "Start New Interview"}
								</ThemedText>
							</LinearGradient>
						</Pressable>
						<Accordion
							title="In Progress"
							titleStyle={styles.sectionTitle}
						>
							{interviews
								.filter((interview) => !interview.completed)
								.map((interview) => (
									<InterviewButton
										key={interview.id}
										interview={interview}
										colors={colors}
										onPress={() =>
											router.push(`/${interview.id}`)
										}
										getToken={getToken}
										setInterviews={setInterviews}
									/>
								))}
						</Accordion>
						<Accordion
							title="Completed"
							titleStyle={styles.sectionTitle}
						>
							{interviews
								.filter((interview) => interview.completed)
								.map((interview) => (
									<InterviewButton
										key={interview.id}
										interview={interview}
										colors={colors}
										onPress={() =>
											router.push(`/${interview.id}`)
										}
										getToken={getToken}
										setInterviews={setInterviews}
									/>
								))}
						</Accordion>
					</ScrollView>
				</SafeAreaView>
			)}
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
