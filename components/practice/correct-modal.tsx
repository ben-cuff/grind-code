import React from "react";
import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import NextProblem from "./next-problem";
import RandomShuffle from "./random-shuffle";

export default function CorrectModal({
	correctModal,
	toggleCorrectModal,
	questionNumber,
	toggleAiModal,
	toggleSolutionModal,
}: {
	correctModal: boolean;
	toggleCorrectModal: React.Dispatch<React.SetStateAction<boolean>>;
	questionNumber: number;
	toggleAiModal: React.Dispatch<React.SetStateAction<boolean>>;
	toggleSolutionModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<Modal animationType="fade" transparent={true} visible={correctModal}>
			<View style={styles.modalContainerMiddle}>
				<View style={styles.modalContentMiddle}>
					<Text style={styles.modalTitle}>Correct!</Text>
					<View style={styles.buttonsRow}>
						<View style={styles.buttonWrapper}>
							<RandomShuffle
								toggleCorrectModal={toggleCorrectModal}
							/>
						</View>
						<View style={styles.buttonWrapper}>
							<NextProblem
								toggleCorrectModal={toggleCorrectModal}
								currentIndex={Number(questionNumber)}
							/>
						</View>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							gap: 10,
						}}
					>
						<Pressable
							style={[
								styles.aiPressableModal,
								{ height: "30%", width: "30%" },
							]}
							onPress={() => {
								toggleAiModal(true);
								toggleCorrectModal(false);
							}}
						>
							<Text style={styles.aiText}>Ask AI</Text>
						</Pressable>
						<Pressable
							style={[
								styles.aiPressableModal,
								{ height: "30%", width: "30%" },
							]}
							onPress={() => {
								toggleCorrectModal(false);
								toggleSolutionModal(true);
							}}
						>
							<Text style={styles.aiText}>Solution</Text>
						</Pressable>
					</View>
					<View style={styles.modalButton}>
						<Button
							title="Back"
							onPress={() => toggleCorrectModal(false)}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainerMiddle: {
		flex: 1,
		marginTop: "auto",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContentMiddle: {
		width: "90%",
		height: "40%",
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
	},
	modalButton: {
		marginTop: "auto",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
	},
	buttonsRow: {
		flexDirection: "row",
		gap: 10,
		width: "100%",
		paddingHorizontal: 16,
	},
	buttonWrapper: {
		flex: 1,
	},
	aiPressableModal: {
		marginTop: 20,
		backgroundColor: "#007AFF",
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 8,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	aiText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "500",
	},
});
