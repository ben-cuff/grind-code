import Accordion from "@/components/interview/accordion";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { AlgorithmPattern, algorithmPatterns } from "@/types/algorithm-pattern";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "@ronradtke/react-native-markdown-display";
import { router } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

export default function LearnScreen() {
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");
	const [loading, setLoading] = useState(false);

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

	const onPress = async (pattern: AlgorithmPattern) => {
		setLoading(true);
		const response = await fetch(
			`${process.env.EXPO_PUBLIC_BASE_URL}/questions/random-question/?pattern=${pattern.id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.json();

		if (data.error) {
			Alert.alert(data.error);
			return;
		}

		setLoading(false);

		router.push("/(tabs)/(practice)");
		router.push({
			pathname: "/(tabs)/(practice)/[questionNumber]",
			params: { questionNumber: data.questionNumber },
		});
	};

	return (
		<ThemedView style={{ flex: 1 }}>
			<SafeAreaView>
				<ThemedText style={{ fontSize: 48, alignSelf: "center" }}>
					Learning
				</ThemedText>
				<ScrollView style={{ marginBottom: 56, padding: 16 }}>
					{algorithmPatterns.map((pattern) => (
						<Accordion
							key={pattern.name}
							title={pattern.name}
							titleStyle={{ fontSize: 24 }}
						>
							<Markdown style={markdownStyle}>
								{pattern.description}
							</Markdown>
							<View style={styles.pressableContainer}>
								<ThemedText
									style={{
										fontSize: 16,
										fontWeight: "600",
									}}
								>
									Practice this pattern
								</ThemedText>
								{loading ? (
									<ActivityIndicator
										size={"large"}
										color={"gray"}
									/>
								) : (
									<Pressable
										style={styles.pressable}
										onPress={() => onPress(pattern)}
									>
										<Ionicons
											name={"shuffle"}
											size={28}
											color="white"
										/>
									</Pressable>
								)}
							</View>
						</Accordion>
					))}
				</ScrollView>
			</SafeAreaView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	pressableContainer: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 12,
		borderRadius: 8,
		height: 64,
	},
	pressable: {
		backgroundColor: "orange",
		padding: 6,
		borderRadius: 1000,
	},
});
