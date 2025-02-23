import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function NextProblem({
	currentIndex,
	toggleCorrectModal,
}: {
	currentIndex: number;
	toggleCorrectModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<View style={styles.nextProblemView}>
			<Text style={styles.text}>Next</Text>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size={"large"} color="#2b7fff" />
				</View>
			) : (
				<Pressable
					style={styles.iconContainer}
					onPress={async () => {
						setIsLoading(true);

						const response = await fetch(
							`${process.env.EXPO_PUBLIC_BASE_URL}/questions/next-question?currentIndex=${currentIndex}`,
							{
								method: "GET",
								headers: {
									"Content-Type": "application/json",
								},
							}
						);
						const data = await response.json();

						setIsLoading(false);
						toggleCorrectModal(false);
						router.push({
							pathname: "/(tabs)/(practice)/[questionNumber]",
							params: { questionNumber: data.questionNumber },
						});
					}}
				>
					<Ionicons
						name={"arrow-forward-circle-outline"}
						color={"white"}
						size={28}
					/>
				</Pressable>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	nextProblemView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 12,
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		height: 64,
	},
	text: {
		fontSize: 16,
		color: "#333",
		fontWeight: "600",
	},
	iconContainer: {
		backgroundColor: "#2b7fff",
		padding: 6,
		borderRadius: 100,
	},
	loadingContainer: {
		padding: 6,
	},
});
