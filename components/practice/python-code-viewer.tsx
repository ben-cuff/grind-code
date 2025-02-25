import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import Markdown from "@ronradtke/react-native-markdown-display";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Button,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

export default function PythonSolution({
	questionNumber,
	setSolutionModal,
}: {
	questionNumber: number;
	setSolutionModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [solution, setSolution] = useState("");
	const [isLoading, setIsLoading] = useState(false);

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

				console.log(questionNumber);

				const response = await fetch(
					`${process.env.EXPO_PUBLIC_BASE_URL}/solutions/?questionNumber=${questionNumber}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const data = await response.json();

				console.log(data.solution);

				setSolution(data.solution);
			} catch (error) {
				console.error("Fetch error:", error);
				setSolution("Error: Failed to get python solution");
			} finally {
				setIsLoading(false);
			}
		}
		fetchResponse();
	}, []);

	return (
		<View style={styles.container}>
			{isLoading ? (
				<View>
					<ActivityIndicator size={"large"} />
				</View>
			) : (
				<ScrollView style={{ flex: 1 }}>
					<Markdown style={markdownStyle}>{solution}</Markdown>
				</ScrollView>
			)}
			<View style={styles.button}>
				<Button title="back" onPress={() => setSolutionModal(false)} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flex: 1,
	},
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	body: {
		fontSize: 16,
		lineHeight: 24,
	},
	button: {
		marginTop: "auto",
	},
});
