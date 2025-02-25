import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import Markdown from "@ronradtke/react-native-markdown-display";
import { LinearGradient } from "expo-linear-gradient";
import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";

export default function InterviewModal({
	feedbackModal,
	feedback,
	toggleFeedbackModal,
	solution,
}: {
	feedbackModal: boolean;
	feedback: { message: string } | undefined;
	toggleFeedbackModal: React.Dispatch<React.SetStateAction<boolean>>;
	solution: string;
}) {
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
		},
		code_block: {
			color: colors.text,
		},
		fence: {
			color: colors.text,
		},
		link: {
			color: colors.primary,
		},
	};

	return (
		<Modal animationType="slide" transparent={true} visible={feedbackModal}>
			<View
				style={[
					styles.modalContainer,
					{ backgroundColor: colors.modal.background },
				]}
			>
				<ThemedView useGradient style={styles.modalContent}>
					<ScrollView style={styles.scrollView}>
						<View style={styles.contentContainer}>
							<ThemedText style={styles.title}>
								Interview Feedback
							</ThemedText>
							<Markdown style={markdownStyle}>
								{feedback?.message ?? ""}
							</Markdown>
							<ThemedText style={styles.solutionTitle}>
								Solution:
							</ThemedText>
							<Markdown style={markdownStyle}>
								{solution}
							</Markdown>
						</View>
					</ScrollView>
					<Pressable
						style={styles.buttonWrapper}
						onPress={() => toggleFeedbackModal(false)}
					>
						<LinearGradient
							colors={[
								colors.button.background[0],
								colors.button.background[1],
							]}
							style={styles.button}
						>
							<ThemedText style={styles.buttonText}>
								Close
							</ThemedText>
						</LinearGradient>
					</Pressable>
				</ThemedView>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		marginTop: "auto",
		alignItems: "center",
		justifyContent: "flex-end",
	} as ViewStyle,
	modalContent: {
		width: "100%",
		height: "80%",
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	} as ViewStyle,
	scrollView: {
		flex: 1,
		marginBottom: 16,
	} as ViewStyle,
	contentContainer: {
		paddingBottom: 24,
	} as ViewStyle,
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	} as TextStyle,
	solutionTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginTop: 24,
		marginBottom: 12,
	} as TextStyle,
	buttonWrapper: {
		width: "100%",
	} as ViewStyle,
	button: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		alignItems: "center",
	} as ViewStyle,
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	} as TextStyle,
});
