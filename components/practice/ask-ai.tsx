import { Question } from "@/types/question";
import { useAuth } from "@clerk/clerk-expo";
import Markdown from "@ronradtke/react-native-markdown-display";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function AskAIScreen({ question }: { question: Question }) {
	const [aiResponse, setAiResponse] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { getToken } = useAuth();

	useEffect(() => {
		async function fetchResponse() {
			try {
				setIsLoading(true);
				const message =
					"You are trying to answer the users question that they got on a coding interview. Give a brief explanation on how to solve it without actually coding anything. This is the prompt: " +
					question.prompt;

				const token = await getToken();

				const response = await fetch(
					`${process.env.EXPO_PUBLIC_BASE_URL}/openai/ask-ai`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ message }),
					}
				);

				if (!response.ok) {
					const errorData = await response.json();
					console.error("API error:", errorData);
					setAiResponse(
						"Error: " +
							(errorData.error || "Failed to fetch response")
					);
					return;
				}

				const data = await response.json();

				setAiResponse(data.message);
			} catch (error) {
				console.error("Fetch error:", error);
				setAiResponse("Error: Failed to connect to AI service");
			} finally {
				setIsLoading(false);
			}
		}
		fetchResponse();
	}, []);

	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator size={"large"} />
			) : (
				<Text style={styles.responseText}>
					<Markdown>{aiResponse}</Markdown>
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	responseText: {
		fontSize: 16,
		lineHeight: 24,
	},
});
