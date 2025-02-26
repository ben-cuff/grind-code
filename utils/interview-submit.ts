import { Message } from "@/types/message";
import uuid from "react-native-uuid";

type HandleSubmitProps = {
	input: string;
	isLoading: boolean;
	setInput: (input: string) => void;
	setIsLoading: (isLoading: boolean) => void;
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	getToken: () => Promise<string | null>;
	solution: string;
};

export const handleSubmit = async ({
	input,
	isLoading,
	setInput,
	setIsLoading,
	messages,
	setMessages,
	getToken,
	solution,
}: HandleSubmitProps) => {
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
			throw new Error(errorData.message || "Failed to fetch response");
		}

		const data = await response.json();

		setMessages((prev) =>
			prev?.map((message) =>
				message.id === tempMessageId
					? { ...message, content: data.message }
					: message
			)
		);

		return data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	} finally {
		setIsLoading(false);
	}
};
