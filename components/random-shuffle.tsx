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

export default function RandomShuffle({
	toggleCorrectModal,
}: {
	toggleCorrectModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<View style={styles.shuffleView}>
			<Text style={styles.text}>Randomize</Text>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size={"large"} color={"orange"} />
				</View>
			) : (
				<Pressable
					style={styles.iconContainer}
					onPress={async () => {
						setIsLoading(true);

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

						setIsLoading(false);
						toggleCorrectModal(false);
						router.push({
							pathname: "/(tabs)/(practice)/[questionNumber]",
							params: { questionNumber: data.questionNumber },
						});
					}}
				>
					<Ionicons name={"shuffle"} size={28} color="white" />
				</Pressable>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	shuffleView: {
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
		backgroundColor: "orange",
		padding: 6,
		borderRadius: 100,
	},
	loadingContainer: {
		padding: 6,
	},
});
