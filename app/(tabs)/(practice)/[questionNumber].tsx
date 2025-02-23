import AskAIModal from "@/components/practice/modals/ask-ai-modal";
import CorrectModal from "@/components/practice/modals/correct-modal";
import SolutionModal from "@/components/practice/modals/solution-modal";
import { Question } from "@/types/question";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function PracticeProblemScreen() {
	const { questionNumber } = useLocalSearchParams();
	const [question, setQuestion] = useState<Question | null>();
	const [isLoading, setIsLoading] = useState(true);
	const [currentPattern, setCurrentPattern] =
		useState<AlgorithmPattern | null>();
	const [options, setOptions] = useState<AlgorithmPattern[] | null>();
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

	useEffect(() => {
		const solution = algorithmPatterns.find(
			({ id }) => id === question?.pattern
		);
		// picks 3 random patterns, adds the answer and then randomizes the order
		setOptions(
			[
				...(solution ? [solution] : []),
				...algorithmPatterns
					.filter(({ id }) => id !== question?.pattern)
					.sort(() => Math.random() - 0.5)
					.slice(0, 3),
			].sort(() => Math.random() - 0.5)
		);
	}, [question]);

	const onSubmit = () => {
		if (currentPattern?.id === question?.pattern) {
			toggleCorrectModal(true);
			return;
		}
		Alert.alert("Incorrect", "Please try again");
	};

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
					<View style={{ paddingBottom: 80 }}>
						<View style={styles.questionContainer}>
							<Text style={styles.questionTitle}>
								{question?.name}
							</Text>
							<Text style={styles.questionPrompt}>
								{question?.prompt}
							</Text>
						</View>
						<View>
							<Text
								style={[
									styles.questionTitle,
									{ textAlign: "center" },
								]}
							>
								Which algorithm pattern is used?
							</Text>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									justifyContent: "space-between",

									margin: 10,
								}}
							>
								{options?.map((option) => (
									<TouchableOpacity
										key={option.id}
										style={[
											{
												width: "48%",
												padding: 8,
												paddingVertical: 10,
												marginVertical: 5,
												borderWidth: 1,
												borderColor: "#000",
												borderRadius: 5,
											},
											currentPattern?.id ===
												option.id && {
												borderColor: "green",
												borderWidth: 3,
												marginVertical: 3,
											},
										]}
										onPress={() =>
											currentPattern?.id === option.id
												? setCurrentPattern(null)
												: setCurrentPattern(option)
										}
									>
										<Text style={{ textAlign: "center" }}>
											{option.name}
										</Text>
									</TouchableOpacity>
								))}
							</View>
							<View
								style={{
									alignItems: "center",
									flex: 1,
								}}
							>
								<TouchableOpacity
									style={{
										padding: 10,
										marginVertical: 5,
										backgroundColor: "#007AFF",
										borderRadius: 5,
										alignItems: "center",
										width: "20%",
									}}
									onPress={onSubmit}
								>
									<Text
										style={{
											color: "#fff",
											textAlign: "center",
										}}
									>
										Submit
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
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
	questionContainer: {
		padding: 16,
		margin: 16,
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	questionTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	questionPrompt: {
		fontSize: 20,
		color: "#333",
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

export type AlgorithmPattern = {
	id: string;
	name: string;
};

export const algorithmPatterns: AlgorithmPattern[] = [
	{ id: "slidingWindow", name: "Sliding Window" },
	{ id: "twoPointer", name: "Two Pointer" },
	{ id: "fastSlowPointers", name: "Fast Slow Pointers" },
	{ id: "binarySearch", name: "Binary Search" },
	{ id: "heapTopK", name: "Heap Top K" },
	{ id: "bfs", name: "BFS" },
	{ id: "dfs", name: "DFS" },
	{ id: "bitwise", name: "Bitwise" },
	{ id: "backtracking", name: "Backtracking" },
	{ id: "dynamicProgramming1d", name: "Dynamic Programming 1D" },
	{ id: "dynamicProgramming2d", name: "Dynamic Programming 2D" },
	{ id: "greedy", name: "Greedy" },
	{ id: "stack", name: "Stack" },
	{ id: "mergeIntervals", name: "Merge Intervals" },
	{ id: "math", name: "Math" },
	{ id: "trees", name: "Trees" },
	{ id: "hashing", name: "Hashing" },
	{ id: "linkedList", name: "Linked List" },
];
