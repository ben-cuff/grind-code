import { Message } from "@/app/(tabs)/(interview)/interview-chat";

type FeedbackHandlerParams = {
	getToken: () => Promise<string | null>;
	messages: Message[];
	setIsLoadingFeedback: (loading: boolean) => void;
	setFeedback: (feedback: { message: string } | undefined) => void;
	toggleFeedbackModal: (show: boolean) => void;
};

type FeedbackResponse = {
	message: string;
	error?: string;
};

class InterviewError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InterviewError";
	}
}

const validateMessages = (messages: Message[]): boolean => {
	return (
		messages.length > 0 &&
		messages.every(
			(msg) =>
				msg.role &&
				msg.content &&
				(msg.role === "user" || msg.role === "assistant")
		)
	);
};

export async function handleFeedback({
	getToken,
	messages,
	setIsLoadingFeedback,
	setFeedback,
	toggleFeedbackModal,
}: FeedbackHandlerParams): Promise<void> {
	try {
		if (!validateMessages(messages)) {
			throw new InterviewError("Invalid message format");
		}

		setIsLoadingFeedback(true);
		const token = await getToken();

		if (!token) {
			throw new InterviewError("Authentication required");
		}

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
				}),
			}
		);

		const data = (await response.json()) as FeedbackResponse;

		if (!response.ok) {
			throw new InterviewError(data.error || "Failed to fetch feedback");
		}

		setFeedback({ message: data.message });
		toggleFeedbackModal(true);
	} catch (error) {
		if (error instanceof InterviewError) {
			alert(error.message);
		} else {
			console.error("Unexpected error:", error);
			alert("An unexpected error occurred");
		}
		setFeedback(undefined);
	} finally {
		setIsLoadingFeedback(false);
	}
}
