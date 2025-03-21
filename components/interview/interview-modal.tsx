import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import Markdown from "@ronradtke/react-native-markdown-display";
import { LinearGradient } from "expo-linear-gradient";
import {
	ActivityIndicator,
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
	isLoading,
	solution,
}: {
	feedbackModal: boolean;
	feedback: { message: string } | undefined;
	toggleFeedbackModal: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
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

	return (
		<Modal animationType="slide" transparent={true} visible={feedbackModal}>
			<View
				style={[
					styles.modalContainer,
					{ backgroundColor: colors.modal.background },
				]}
			>
				<ThemedView
					useGradient
					style={[
						styles.modalContent,
						{ height: isLoading ? "50%" : "80%" },
					]}
				>
					{isLoading ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator size={"large"} />
							<ThemedText
								style={{ textAlign: "center", marginTop: 12 }}
							>
								Loading Feedback...
							</ThemedText>
						</View>
					) : (
						<View style={{ flex: 1 }}>
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
								onPress={() => {
									toggleFeedbackModal(false);
								}}
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
						</View>
					)}
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
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	} as ViewStyle,
	loadingContainer: {
		flex: 1,
		alignContent: "center",
		marginTop: 20,
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
