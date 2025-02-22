import { Question } from "@/types/question";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PracticeProblemScreen() {
	const { questionNumber } = useLocalSearchParams();
	const [question, setQuestion] = useState<Question | null>();
	const [isLoading, setIsLoading] = useState(true);

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

	const pattern = algorithmPatterns.filter(
		(pattern) => pattern.id === question?.pattern
	);

	return (
		<ScrollView style={styles.container}>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<Text>{question?.name}</Text>
					<Text>Prompt: {question?.prompt}</Text>
					<Text>{pattern[0]?.name}</Text>
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

export const algorithmPatterns = [
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
