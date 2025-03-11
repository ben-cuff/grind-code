import ChatArea from "@/components/interview/chat-area";
import InterviewModal from "@/components/interview/interview-modal";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Message } from "@/types/message";
import { Question } from "@/types/question";
import { handleFeedback } from "@/utils/interview-feedback";
import { handleSubmit } from "@/utils/interview-submit";
import { sendInterview } from "@/utils/send-interview";
import { useAuth } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";

export default function InterviewChatDynamic() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
	const [initialLoad, setInitialLoad] = useState(false);
	const [solution, setSolution] = useState("");
	const [question, setQuestion] = useState<Question | null>(null);
	const [feedback, setFeedback] = useState<{ message: string }>();
	const { interviewId } = useLocalSearchParams();
	const [feedbackModal, toggleFeedbackModal] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [input, setInput] = useState("");
	const { getToken } = useAuth();
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	useEffect(() => {
		const sendInterviewData = async () => {
			await sendInterview(
				getToken,
				interviewId.toString(),
				messages,
				question!
			);
			if (
				messages.length > 20 &&
				!feedback &&
				!isLoadingFeedback &&
				!isLoading
			) {
				await handleFeedbackClick();
			}
		};
		sendInterviewData();
	}, [messages]);

	useEffect(() => {
		const fetchData = async () => {
			setInitialLoad(true);

			const token = await getToken();
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/interview/${interviewId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				const error = await response.json();
				alert(error.error || "Failed to fetch interview");
				return;
			}

			const data = await response.json();
			setMessages(data.interview.messages || []);
			setQuestion(data.questionDetails);
			setSolution(data.solution.solution || "");
			if (data.interview.feedback) {
				setFeedback({ message: data.interview.feedback });
			}

			setInitialLoad(false);
		};
		fetchData();
	}, []);

	const onSubmit = async () => {
		await handleSubmit({
			input,
			isLoading,
			setInput,
			setIsLoading,
			messages,
			setMessages,
			getToken,
			solution,
		});
	};

	const handleFeedbackClick = async () => {
		toggleFeedbackModal(true);
		await handleFeedback({
			getToken,
			messages,
			setIsLoadingFeedback,
			setFeedback,
			toggleFeedbackModal,
		});
	};

	useEffect(() => {
		if (feedback) {
			setDisabled(true);

			const sendFeedback = async () => {
				const token = await getToken();
				await fetch(
					`${process.env.EXPO_PUBLIC_BASE_URL}/interview/${interviewId}/feedback`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							feedback: feedback,
						}),
					}
				);
			};
			sendFeedback();
		}
	}, [feedback]);

	return initialLoad ? (
		<ThemedView style={styles.loadingContainer}>
			<ActivityIndicator size="large" color="gray" />
			<ThemedText style={styles.loadingText}>Loading...</ThemedText>
		</ThemedView>
	) : (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ThemedView style={{ flex: 1 }}>
				<InterviewModal
					feedbackModal={feedbackModal}
					feedback={feedback!}
					toggleFeedbackModal={toggleFeedbackModal}
					solution={solution}
					isLoading={isLoadingFeedback}
				/>

				<View style={styles.container}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						keyboardVerticalOffset={100}
						style={{ flex: 1 }}
					>
						<ChatArea messages={messages} />
						<View style={styles.inputContainer}>
							<TextInput
								style={[
									styles.input,
									{
										backgroundColor: colors.surfaceAlt,
										color: colors.text,
										borderColor: colors.border,
									},
								]}
								multiline
								value={input}
								onChangeText={setInput}
								placeholder="Type your message"
								placeholderTextColor={colors.text}
							/>
							<Pressable
								style={styles.buttonWrapper}
								onPress={onSubmit}
								disabled={isLoading || disabled}
							>
								<LinearGradient
									colors={[
										colors.button.background[0],
										colors.button.background[1],
									]}
									style={styles.button}
								>
									<ThemedText style={styles.buttonText}>
										{isLoading ? "Sending..." : "Send"}
									</ThemedText>
								</LinearGradient>
							</Pressable>
						</View>
						{messages.length >= 3 &&
							messages[2].content != "" &&
							!feedback && (
								<Pressable
									style={[
										styles.buttonWrapper,
										styles.endButton,
									]}
									onPress={handleFeedbackClick}
									disabled={isLoadingFeedback || disabled}
								>
									<LinearGradient
										colors={[
											colors.button.background[0],
											colors.button.background[1],
										]}
										style={styles.button}
									>
										<ThemedText style={styles.buttonText}>
											{isLoadingFeedback
												? "Generating Feedback..."
												: "End Interview"}
										</ThemedText>
									</LinearGradient>
								</Pressable>
							)}
						{feedback && (
							<Pressable
								style={[styles.buttonWrapper, styles.endButton]}
								onPress={() => toggleFeedbackModal(true)}
							>
								<LinearGradient
									colors={[
										colors.button.background[0],
										colors.button.background[1],
									]}
									style={styles.button}
								>
									<ThemedText style={styles.buttonText}>
										Show Feedback
									</ThemedText>
								</LinearGradient>
							</Pressable>
						)}
					</KeyboardAvoidingView>
				</View>
			</ThemedView>
		</TouchableWithoutFeedback>
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
		marginBottom: 8,
		marginTop: "auto",
		gap: 12,
	},
	input: {
		height: 48,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 16,
		maxHeight: 100,
		padding: 8,
		height: "auto",
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
