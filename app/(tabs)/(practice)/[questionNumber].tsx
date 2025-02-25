import { AskAIModal } from "@/components/practice/modals/ask-ai-modal";
import { CorrectModal } from "@/components/practice/modals/correct-modal";
import { SolutionModal } from "@/components/practice/modals/solution-modal";
import QuestionDisplay from "@/components/practice/question";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Question } from "@/types/question";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

export default function PracticeProblemScreen() {
	const { questionNumber } = useLocalSearchParams();
	const [question, setQuestion] = useState<Question | null>();
	const [isLoading, setIsLoading] = useState(true);
	const [correctModal, setCorrectModal] = useState(false);
	const [aiModal, setAiModal] = useState(false);
	const [solutionModal, setSolutionModal] = useState(false);
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");
	const router = useRouter();

	useEffect(() => {
		async function fetchQuestions() {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/questions?questionNumber=${questionNumber}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.json();
			setQuestion(data);
			setIsLoading(false);
		}
		fetchQuestions();
	}, []);

	const handleNext = () => {
		setCorrectModal(false);
		router.push({
			pathname: "/(tabs)/(practice)/[questionNumber]",
			params: { questionNumber: Number(questionNumber) + 1 },
		});
	};

	return (
		<ThemedView style={{ flex: 1 }}>
			<CorrectModal
				isVisible={correctModal}
				onClose={() => setCorrectModal(false)}
				onNext={handleNext}
				onAskAI={() => {
					setCorrectModal(false);
					setAiModal(true);
				}}
			/>
			<AskAIModal
				isVisible={aiModal}
				onClose={() => setAiModal(false)}
				setAiModal={setAiModal}
				question={question!}
			/>
			<SolutionModal
				isVisible={solutionModal}
				onClose={() => setSolutionModal(false)}
				questionNumber={question?.questionNumber!}
				setSolutionModal={setSolutionModal}
			/>
			<ScrollView style={styles.container}>
				{isLoading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator
							size={"large"}
							color={colors.primary}
						/>
					</View>
				) : (
					<QuestionDisplay
						question={question!}
						toggleCorrectModal={setCorrectModal}
					/>
				)}
			</ScrollView>
			<View style={styles.buttonContainer}>
				<Pressable
					style={styles.buttonWrapper}
					onPress={() => setAiModal(true)}
				>
					<LinearGradient
						colors={[
							colors.button.background[0],
							colors.button.background[1],
						]}
						style={styles.button}
					>
						<ThemedText style={styles.buttonText}>
							Ask AI
						</ThemedText>
					</LinearGradient>
				</Pressable>
				<Pressable
					style={styles.buttonWrapper}
					onPress={() => setSolutionModal(true)}
				>
					<LinearGradient
						colors={[
							colors.button.background[0],
							colors.button.background[1],
						]}
						style={styles.button}
					>
						<ThemedText style={styles.buttonText}>
							Solution
						</ThemedText>
					</LinearGradient>
				</Pressable>
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	buttonContainer: {
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	buttonWrapper: {
		width: "45%",
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
