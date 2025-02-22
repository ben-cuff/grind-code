import NextProblem from "@/components/next-problem";
import RandomShuffle from "@/components/random-shuffle";
import { Question } from "@/types/question";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	Alert,
	Modal,
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
		<ScrollView style={styles.container}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={correctModal}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Correct!</Text>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => toggleCorrectModal(false)}
						>
							<Text style={styles.modalButtonText}>Close</Text>
						</TouchableOpacity>
						<RandomShuffle
							toggleCorrectModal={toggleCorrectModal}
						/>
						<NextProblem
							toggleCorrectModal={toggleCorrectModal}
							currentIndex={Number(question?.questionNumber)}
						/>
					</View>
				</View>
			</Modal>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<Text>{question?.name}</Text>
					<Text>Prompt: {question?.prompt}</Text>
					<View>
						<Text>Which algorithm pattern is used?</Text>
						<View>
							{options?.map((option) => (
								<TouchableOpacity
									key={option.id}
									style={[
										{
											padding: 10,
											marginVertical: 5,
											borderWidth: 1,
											borderColor: "#000",
											borderRadius: 5,
										},
										currentPattern?.id === option.id && {
											borderColor: "green",
											borderWidth: 2,
										},
									]}
									onPress={() => {
										setCurrentPattern(option);
									}}
								>
									<Text>{option.name}</Text>
								</TouchableOpacity>
							))}
							<TouchableOpacity
								style={{
									padding: 10,
									marginVertical: 5,
									backgroundColor: "#007AFF",
									borderRadius: 5,
									alignItems: "center",
								}}
								onPress={onSubmit}
							>
								<Text style={{ color: "#fff" }}>Submit</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	modalContainer: {
		flex: 1,
		marginTop: "auto",
		alignItems: "center",
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "100%",
		height: "60%",
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
	},
	modalButton: {
		marginTop: 10,
		backgroundColor: "#007AFF",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
	},
	modalButtonText: {
		color: "#fff",
		fontSize: 16,
	},
	codeContainer: {
		padding: 16,
		backgroundColor: "#f5f5f5",
		borderRadius: 8,
		margin: 16,
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
