import { Question } from "@/types/question";
import { useAuth } from "@clerk/clerk-expo";
import Markdown from "@ronradtke/react-native-markdown-display";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
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
	const [feedback, setFeedback] = useState();
	const [input, setInput] = useState("");
	const { getToken } = useAuth();

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

			console.log(data);

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

			console.log(dataSolution);

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

		// console.log(JSON.stringify(messages, null, 2));

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

			console.log(data);
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

	const handleFeedback = async () => {
		try {
			setIsLoadingFeedback(true);
			const token = await getToken();
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/openai/feedback`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						messages: messages.map(({ role, content }) => ({
							role,
							content,
						})),
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

			console.log(data);

			setIsLoadingFeedback(false);
		} catch (error) {
			console.error(error);
		}
	};

	return initialLoad ? (
		<Text>Loading</Text>
	) : (
		<ScrollView>
			<View
				style={{
					padding: 10,
					backgroundColor: "#f9f9f9",
					borderRadius: 8,
					marginBottom: 20,
				}}
			>
				{messages.map((msg, index) => {
					const isUser = msg.role === "user";
					return (
						<View
							key={msg.id}
							style={{
								flexDirection: isUser ? "row-reverse" : "row",
								padding: 8,
								backgroundColor: isUser ? "#dcf8c6" : "#fff",
								alignSelf: isUser ? "flex-end" : "flex-start",
								borderRadius: 5,
								maxWidth: "80%",
								height: "auto",
								width: "auto",
								alignItems: "center",
							}}
						>
							<View
								style={{
									width: 40,
									height: 40,
									borderRadius: 20,
									backgroundColor: isUser
										? "#007AFF"
										: "#FF9500",
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 8,
								}}
							>
								<Text
									style={{
										color: "#fff",
										fontWeight: "bold",
									}}
								>
									{isUser ? "ME" : "AI"}
								</Text>
							</View>
							<Markdown
								style={{
									body: {
										color: "#333",
										fontSize: 16,
										textAlign: isUser ? "right" : "left",
										flexShrink: 1,
										width: "100%",
									},
								}}
							>
								{msg.content}
							</Markdown>
						</View>
					);
				})}
			</View>
			<View>
				<TextInput
					style={{
						height: 40,
						borderColor: "gray",
						borderWidth: 1,
						marginVertical: 10,
						paddingHorizontal: 5,
					}}
					value={input}
					onChangeText={setInput}
					placeholder="Type your message"
				/>
				<Button
					title={isLoading ? "Sending..." : "Send"}
					onPress={handleSubmit}
					disabled={isLoading}
				/>
			</View>
			<Button
				title={
					isLoadingFeedback
						? "Generating Feedback..."
						: "End Interview"
				}
				onPress={handleFeedback}
				disabled={isLoadingFeedback}
			/>
		</ScrollView>
	);
}
