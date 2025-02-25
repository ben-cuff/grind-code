import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AlgorithmPattern, algorithmPatterns } from "@/types/algorithm-pattern";
import { Question } from "@/types/question";
import { useTheme } from "@/context/theme-context";
import { getThemeColors } from "@/constants/theme";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import QuestionOptions from "./question-options";

export default function QuestionDisplay({
	question,
	toggleCorrectModal,
}: {
	question: Question;
	toggleCorrectModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [options, setOptions] = useState<AlgorithmPattern[] | null>();
	const [currentPattern, setCurrentPattern] =
		useState<AlgorithmPattern | null>();
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	useEffect(() => {
		const solution = algorithmPatterns.find(
			({ id }) => id === question?.pattern
		);
		// picks 3 random patterns, adds the answer and then randomizes the order
		setOptions(
			[
				...(solution ? [solution] : []),
				...algorithmPatterns
					.filter(({ id }) => id !== question?.pattern)
					.sort(() => Math.random() - 0.5)
					.slice(0, 3),
			].sort(() => Math.random() - 0.5)
		);
	}, [question]);

	const onSubmit = () => {
		if (currentPattern?.id === question?.pattern) {
			toggleCorrectModal(true);
			return;
		}
		Alert.alert("Incorrect", "Please try again");
	};

	return (
		<View style={{ paddingBottom: 80 }}>
			<ThemedView style={[styles.questionContainer, { backgroundColor: colors.surfaceAlt }]}>
				<ThemedText style={styles.questionTitle}>{question?.name}</ThemedText>
				<ThemedText style={styles.questionPrompt}>{question?.prompt}</ThemedText>
			</ThemedView>
			<View>
				<ThemedText style={[styles.questionTitle, { textAlign: "center" }]}>
					Which algorithm pattern is used?
				</ThemedText>
				<QuestionOptions
					options={options!}
					currentPattern={currentPattern!}
					setCurrentPattern={setCurrentPattern!}
				/>
				<View style={{ alignItems: "center", flex: 1 }}>
					<TouchableOpacity onPress={onSubmit}>
						<LinearGradient
							colors={colors.button.background}
							style={styles.submitButton}
						>
							<ThemedText style={styles.submitButtonText}>
								Submit
							</ThemedText>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	questionContainer: {
		padding: 16,
		borderRadius: 12,
		marginBottom: 24,
	},
	questionTitle: {
		fontSize: 24,
		fontWeight: "600",
		marginBottom: 12,
	},
	questionPrompt: {
		fontSize: 16,
		lineHeight: 24,
	},
	submitButton: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		marginTop: 16,
	},
	submitButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
