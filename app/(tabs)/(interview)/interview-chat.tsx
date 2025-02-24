import { useAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import uuid from "react-native-uuid";

export interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
}

export default function InterviewChat() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "initial",
			role: "assistant",
			content: "Hello! How can I help you today?",
		},
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [input, setInput] = useState("");
	const { getToken } = useAuth();

	const handleSubmit = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: uuid.v4(),
			role: "user",
			content: input.trim(),
		};

		console.log(userMessage);

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		const tempMessageId = uuid.v4();
		setMessages((prev) => [
			...prev,
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
				// "http://localhost:3000/openai/stream",
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
				prev.map((message) =>
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

	return (
		<ScrollView>
			<View>
				{messages.map((msg, index) => (
					<Text key={msg.id}>
						{index}. {msg.content}
					</Text>
				))}
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
		</ScrollView>
	);
}
