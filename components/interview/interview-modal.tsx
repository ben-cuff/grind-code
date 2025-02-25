import Markdown from "@ronradtke/react-native-markdown-display";
import {
	Button,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	View,
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
	return (
		<Modal animationType="slide" transparent={true} visible={feedbackModal}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<ScrollView style={{ flex: 1 }}>
						<Text
							style={{
								marginBottom: 20,
								fontSize: 16,
								textAlign: "center",
							}}
						>
							<Markdown>{feedback?.message ?? ""}</Markdown>
							<Markdown>{solution}</Markdown>
						</Text>
						<View
							style={{
								justifyContent: "flex-end",
								width: "40%",
								alignSelf: "center",
							}}
						>
							<Button
								title="Back"
								onPress={() => {
									toggleFeedbackModal(false);
								}}
							/>
						</View>
					</ScrollView>
				</View>
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
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "100%",
		height: "60%",
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		alignItems: "center",
	},
});
