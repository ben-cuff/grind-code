import AskAIModal from "@/components/practice/modals/ask-ai-modal";
import CorrectModal from "@/components/practice/modals/correct-modal";
import SolutionModal from "@/components/practice/modals/solution-modal";
import QuestionDisplay from "@/components/practice/question";
import { Question } from "@/types/question";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function PracticeProblemScreen() {
	const { questionNumber } = useLocalSearchParams();
	const [question, setQuestion] = useState<Question | null>();
	const [isLoading, setIsLoading] = useState(true);
	const [correctModal, toggleCorrectModal] = useState(false);
	const [aiModal, toggleAiModal] = useState(false);
	const [solutionModal, toggleSolutionModal] = useState(false);

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

	return (
		<View style={{ flex: 1 }}>
			<CorrectModal
				correctModal={correctModal}
				toggleCorrectModal={toggleCorrectModal}
				questionNumber={Number(question?.questionNumber)}
				toggleAiModal={toggleAiModal}
				toggleSolutionModal={toggleSolutionModal}
			/>
			<AskAIModal
				aiModal={aiModal}
				question={question!}
				toggleAiModal={toggleAiModal}
			/>
			<SolutionModal
				solutionModal={solutionModal}
				question={question!}
				toggleSolutionModal={toggleSolutionModal}
			/>
			<ScrollView style={styles.container}>
				{isLoading ? (
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ActivityIndicator size={"large"} />
					</View>
				) : (
					<QuestionDisplay
						question={question!}
						toggleCorrectModal={toggleCorrectModal}
					/>
				)}
			</ScrollView>
			<View style={styles.bottomButtonSolution}>
				<Pressable
					style={styles.aiPressable}
					onPress={() => {
						toggleSolutionModal(true);
					}}
				>
					<Text style={styles.aiText}>Solution</Text>
				</Pressable>
			</View>
			<View style={styles.bottomButton}>
				<Pressable
					style={styles.aiPressable}
					onPress={() => {
						toggleAiModal(true);
					}}
				>
					<Text style={styles.aiText}>Ask AI</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	aiPressable: {
		marginTop: 20,
		backgroundColor: "#007AFF",
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	aiText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "500",
	},
	bottomButton: {
		position: "absolute",
		bottom: 20,
		alignSelf: "flex-start",
		paddingLeft: 20,
		width: "30%",
	},
	bottomButtonSolution: {
		position: "absolute",
		bottom: 20,
		alignSelf: "flex-end",
		paddingRight: 20,
		width: "30%",
	},
});
