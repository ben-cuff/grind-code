import Markdown from "@ronradtke/react-native-markdown-display";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function PythonSolution({
	questionNumber,
}: {
	questionNumber: number;
}) {
	const [solution, setSolution] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchResponse() {
			try {
				setIsLoading(true);

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
				<ActivityIndicator size={"large"} />
			) : (
				<Markdown style={styles}>{solution}</Markdown>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	body: {
		fontSize: 16,
		lineHeight: 24,
	},
});
