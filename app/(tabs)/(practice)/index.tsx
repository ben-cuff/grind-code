import QuestionsList from "@/components/practice/questions-list";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Question } from "@/types/question";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PracticeTab() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [questions, setQuestions] = useState<Question[]>([]);
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	return (
		<ThemedView style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<ThemedText style={styles.title}>Practice</ThemedText>
				<View
					style={[
						styles.shuffleView,
						{ backgroundColor: colors.surfaceAlt },
					]}
				>
					<ThemedText style={styles.text}>Random Problem</ThemedText>
					{isLoading ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator
								size={"large"}
								color={colors.primary}
							/>
						</View>
					) : (
						<Pressable
							style={[
								styles.iconContainer,
								{ backgroundColor: colors.primary },
							]}
							onPress={async () => {
								setIsLoading(true);

								const randomQuestionIndex = Math.floor(
									Math.random() * questions.length
								);

								setIsLoading(false);
								router.push({
									pathname:
										"/(tabs)/(practice)/[questionNumber]",
									params: {
										questionNumber:
											questions[randomQuestionIndex]
												.questionNumber,
									},
								});
							}}
						>
							<Ionicons
								name={"shuffle"}
								size={28}
								color={colors.button.text}
							/>
						</Pressable>
					)}
				</View>
				<QuestionsList
					questions={questions}
					setQuestions={setQuestions}
				/>
			</SafeAreaView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	shuffleView: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		paddingLeft: 12,
		paddingVertical: 12,
		borderRadius: 8,
		marginVertical: 8,
	},
	title: {
		fontSize: 48,
		textAlign: "center",
	},
	text: {
		fontSize: 24,
		marginRight: 8,
	},
	iconContainer: {
		marginLeft: "auto",
		padding: 5,
		borderRadius: 100,
	},
	loadingContainer: {
		marginLeft: "auto",
		borderRadius: 100,
	},
});
