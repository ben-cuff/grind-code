import { Question } from "@/types/question";
import { Button, Modal, ScrollView, StyleSheet, View } from "react-native";
import PythonSolution from "../python-code-viewer";

export default function SolutionModal({
	solutionModal,
	question,
	toggleSolutionModal,
}: {
	solutionModal: boolean;
	question: Question;
	toggleSolutionModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<Modal animationType="slide" transparent={true} visible={solutionModal}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<ScrollView style={{ flex: 1 }}>
						<PythonSolution
							questionNumber={question?.questionNumber!}
						/>
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
									toggleSolutionModal(false);
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
