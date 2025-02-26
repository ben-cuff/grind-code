import { Message } from "@/types/message";
import { Question } from "@/types/question";

export async function sendInterview(
	getToken: () => Promise<string | null>,
	interviewId: string,
	messages: Message[],
	question: Question
) {
	const token = await getToken();
	await fetch(
		`${process.env.EXPO_PUBLIC_BASE_URL}/interview/${interviewId}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				messages: messages,
				questionNumber: question?.questionNumber,
			}),
		}
	);
}
