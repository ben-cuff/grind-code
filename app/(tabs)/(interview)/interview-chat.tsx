import ChatArea from "@/components/interview/chat-area";
import InterviewModal from "@/components/interview/interview-modal";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/context/theme-context";
import { getThemeColors } from "@/constants/theme";
import { Question } from "@/types/question";
import { handleFeedback } from "@/utils/interview";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import uuid from "react-native-uuid";

export interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
}

export default function InterviewChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
	const [initialLoad, setInitialLoad] = useState(false);
	const [solution, setSolution] = useState("");
	const [question, setQuestion] = useState<Question | null>(null);
	const [feedback, setFeedback] = useState<{ message: string }>();
	const [feedbackModal, toggleFeedbackModal] = useState(false);
	const [input, setInput] = useState("");
	const { getToken } = useAuth();
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	useEffect(() => {
		const fetchData = async () => {
			setInitialLoad(true);
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/questions/random-question`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();

			setQuestion(data);

			setMessages([
				{
					id: "initial",
					role: "assistant",
					content: data.prompt,
				},
			]);

			const responseSolution = await fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/solutions/?questionNumber=${data.questionNumber}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const dataSolution = await responseSolution.json();

			setSolution(dataSolution.solution);

			setInitialLoad(false);
		};
		fetchData();
	}, []);

	const handleSubmit = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: uuid.v4(),
			role: "user",
			content: input.trim(),
		};

		setMessages((prev) => [...prev!, userMessage]);
		setInput("");
		setIsLoading(true);

		const tempMessageId = uuid.v4();
		setMessages((prev) => [
			...prev!,
			{
				id: tempMessageId,
				role: "assistant",
				content: "",
			},
		]);

		try {
			const token = await getToken();
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/openai/stream`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						messages: [...messages, userMessage].map(
							({ role, content }) => ({
								role,
								content,
							})
						),
						solution,
					}),
				}
			);

			if (!response.ok) {
				console.log(response);
				const errorData = await response.json();
				alert(errorData.error || "Failed to fetch response");
				throw new Error(
					errorData.message || "Failed to fetch response"
				);
			}

			const data = await response.json();

			setMessages((prev) =>
				prev?.map((message) =>
					message.id === tempMessageId
						? { ...message, content: data.message }
						: message
				)
			);

			// const reader = response.body.getReader();
			// const decoder = new TextDecoder();
			// let content = "";

			// while (true) {
			// 	const { done, value } = await reader.read();
			// 	if (done) break;

			// 	const chunk = decoder.decode(value);
			// 	content += chunk;
			// 	console.log(chunk);

			// 	// Update the temporary message with the accumulated content
			// 	setMessages((prev) =>
			// 		prev.map((message) =>
			// 			message.id === tempMessageId
			// 				? { ...message, content }
			// 				: message
			// 		)
			// 	);
			// }
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFeedbackClick = async () => {
		await handleFeedback({
			getToken,
			messages,
			setIsLoadingFeedback,
			setFeedback,
			toggleFeedbackModal,
		});
	};

	return initialLoad ? (
		<ThemedView style={styles.loadingContainer}>
			<ActivityIndicator size="large" color={colors.primary} />
			<ThemedText style={styles.loadingText}>Loading...</ThemedText>
		</ThemedView>
	) : (
		<ThemedView style={{ flex: 1 }}>
			<InterviewModal
				feedbackModal={feedbackModal}
				feedback={feedback!}
				toggleFeedbackModal={toggleFeedbackModal}
				solution={solution}
			/>
			<ScrollView style={styles.container}>
				<ChatArea messages={messages} />
				<View style={styles.inputContainer}>
					<TextInput
						style={[styles.input, { 
							backgroundColor: colors.surfaceAlt,
							color: colors.text,
							borderColor: colors.border
						}]}
						value={input}
						onChangeText={setInput}
						placeholder="Type your message"
						placeholderTextColor={colors.text}
					/>
					<Pressable
						style={styles.buttonWrapper}
						onPress={handleSubmit}
						disabled={isLoading}
					>
						<LinearGradient
							colors={[colors.button.background[0], colors.button.background[1]]}
							style={styles.button}
						>
							<ThemedText style={styles.buttonText}>
								{isLoading ? "Sending..." : "Send"}
							</ThemedText>
						</LinearGradient>
					</Pressable>
				</View>
				{messages.length > 2 && (
					<Pressable
						style={[styles.buttonWrapper, styles.endButton]}
						onPress={handleFeedbackClick}
						disabled={isLoadingFeedback}
					>
						<LinearGradient
							colors={[colors.button.background[0], colors.button.background[1]]}
							style={styles.button}
						>
							<ThemedText style={styles.buttonText}>
								{isLoadingFeedback ? "Generating Feedback..." : "End Interview"}
							</ThemedText>
						</LinearGradient>
					</Pressable>
				)}
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		marginTop: 10,
		fontSize: 16,
	},
	inputContainer: {
		marginVertical: 16,
		gap: 12,
	},
	input: {
		height: 48,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 16,
	},
	buttonWrapper: {
		width: "100%",
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
	endButton: {
		marginBottom: 24,
	},
});
