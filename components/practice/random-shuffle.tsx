import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
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
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	return (
		<View
			style={[
				styles.shuffleView,
				{ backgroundColor: colors.background[1] },
			]}
		>
			<Text style={[styles.text, { color: colors.text }]}>Randomize</Text>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size={"large"} color={"gray"} />
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
						router.push("/(tabs)/(practice)");
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
		borderRadius: 8,
		height: 64,
	},
	text: {
		fontSize: 16,
		fontWeight: "600",
	},
	iconContainer: {
		backgroundColor: "orange",
		padding: 6,
		borderRadius: 1000,
	},
	loadingContainer: {
		padding: 6,
	},
});
