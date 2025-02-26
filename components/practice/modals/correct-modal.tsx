import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Question } from "@/types/question";
import { LinearGradient } from "expo-linear-gradient";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import NextProblem from "../next-problem";
import RandomShuffle from "../random-shuffle";

interface CorrectModalProps {
	isVisible: boolean;
	onClose: () => void;
	onAskAI: () => void;
	onSolution: () => void;
	question: Question | undefined;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CorrectModal({
	isVisible,
	onClose,
	onAskAI,
	onSolution,
	question,
	setIsVisible,
}: CorrectModalProps) {
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<View
				style={[
					styles.modalContainer,
					{ backgroundColor: colors.modal.background },
				]}
			>
				<ThemedView useGradient style={styles.modalContent}>
					<ThemedText style={styles.modalTitle}>Correct!</ThemedText>

					<View style={styles.buttonsRow}>
						<View style={styles.buttonWrapper}>
							<RandomShuffle toggleCorrectModal={setIsVisible} />
						</View>
						<View style={styles.buttonWrapper}>
							<NextProblem
								currentIndex={question?.questionNumber!}
								toggleCorrectModal={setIsVisible}
							/>
						</View>
					</View>
					<View style={styles.buttonsRow}>
						<TouchableOpacity
							style={styles.buttonWrapper}
							onPress={onAskAI}
						>
							<LinearGradient
								colors={["#4c669f", "#3b5998", "#192f6a"]}
								style={[styles.button, styles.aiButton]}
							>
								<ThemedText style={styles.buttonText}>
									Ask AI to Explain
								</ThemedText>
							</LinearGradient>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonWrapper}
							onPress={onSolution}
						>
							<LinearGradient
								colors={["#4c669f", "#3b5998", "#192f6a"]}
								style={[styles.button, styles.aiButton]}
							>
								<ThemedText style={styles.buttonText}>
									Solution
								</ThemedText>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</ThemedView>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modalContent: {
		width: "90%",
		padding: 24,
		borderRadius: 20,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
	},
	buttonsRow: {
		flexDirection: "row",
		gap: 16,
		width: "100%",
		marginBottom: 16,
	},
	buttonWrapper: {
		flex: 1,
	},
	button: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		alignItems: "center",
		width: "100%",
	},
	aiButton: {
		marginTop: 8,
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
