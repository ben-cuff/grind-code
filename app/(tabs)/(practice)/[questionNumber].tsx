import { Question } from "@/types/question";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
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

	return (
		<ScrollView style={styles.container}>
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
								onPress={() => {}}
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
