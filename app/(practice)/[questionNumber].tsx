import { Question } from "@/types/question";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import pythonSolution from "../../public/python/0001-two-sum.py";

export default function PracticeProblemScreen() {
	const { questionNumber } = useLocalSearchParams();
	const [question, setQuestion] = useState<Question>();
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
			console.log(data);
			setQuestion(data);

			setIsLoading(false);
		}
		fetchQuestions();
	}, []);

	return (
		<ScrollView style={styles.container}>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<Text>{question?.name}</Text>
					<Text>Prompt: {question?.prompt}</Text>
					<View style={styles.codeContainer}>
						<Text style={styles.codeText}>{pythonSolution}</Text>
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
	codeText: {
		fontFamily: "monospace",
		fontSize: 14,
	},
});
