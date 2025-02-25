import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Question } from "@/types/question";
import { useAuth } from "@clerk/clerk-expo";
import Markdown from "@ronradtke/react-native-markdown-display";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Button,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

export default function AskAIScreen({
	question,
	setAiModal,
}: {
	question: Question;
	setAiModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [aiResponse, setAiResponse] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { getToken } = useAuth();
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	const markdownStyle = {
		body: {
			color: colors.text,
			fontSize: 16,
			lineHeight: 24,
		},
		code_inline: {
			color: colors.text,
			backgroundColor: colors.code,
		},
		code_block: {
			color: colors.text,
			backgroundColor: colors.code,
		},
		fence: {
			color: colors.text,
			backgroundColor: colors.code,
		},
		link: {
			color: colors.primary,
		},
	};

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

				if (response.status == 402) {
					const data = await response.json();
					setAiModal(false);
					Alert.alert(data.error);
					return;
				}

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
				<View
					style={{
						flex: 1,
						alignContent: "center",
					}}
				>
					<ActivityIndicator size={"large"} color={"gray"} />
				</View>
			) : (
				<ScrollView>
					<Markdown style={markdownStyle}>{aiResponse}</Markdown>
				</ScrollView>
			)}
			<Button title="back" onPress={() => setAiModal(false)} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
});
