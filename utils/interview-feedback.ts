import { Message } from "@/types/message";
import { Alert } from "react-native";

export async function handleFeedback({
	getToken,
	messages,
	setIsLoadingFeedback,
	setFeedback,
	toggleFeedbackModal,
}: {
	getToken: () => Promise<string | null>;
	messages: Message[];
	setIsLoadingFeedback: (loading: boolean) => void;
	setFeedback: (feedback: { message: string } | undefined) => void;
	toggleFeedbackModal: (show: boolean) => void;
}): Promise<void> {
	try {
		setIsLoadingFeedback(true);
		const token = await getToken();

		const [response, _] = await Promise.all([
			fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/openai/feedback`, {
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
				}),
			}),
			fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/accounts/123/activity/interview`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			),
		]);

		const data = await response.json();

		setFeedback({ message: data.message });
		toggleFeedbackModal(true);
	} catch (error) {
		Alert.alert("An unexpected error occurred");
		setFeedback(undefined);
	} finally {
		setIsLoadingFeedback(false);
	}
}
