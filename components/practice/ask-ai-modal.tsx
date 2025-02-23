import { Question } from "@/types/question";
import React from "react";
import { Button, Modal, ScrollView, StyleSheet, View } from "react-native";
import AskAIScreen from "./ask-ai";

export default function AskAIModal({
	aiModal,
	question,
	toggleAiModal,
}: {
	aiModal: boolean;
	question: Question;
	toggleAiModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<Modal animationType="slide" transparent={true} visible={aiModal}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<ScrollView style={{ flex: 1 }}>
						<AskAIScreen question={question!} />
						<View style={{ justifyContent: "flex-end" }}>
							<Button
								title="Back"
								onPress={() => {
									toggleAiModal(false);
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
