import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Question } from "@/types/question";
import { Modal, StyleSheet, View } from "react-native";
import AskAIScreen from "../ask-ai";

interface AskAIModalProps {
	isVisible: boolean;
	onClose: () => void;
	question: Question;
	toggleAiModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AskAIModal({
	isVisible,
	onClose,
	question,
	toggleAiModal,
}: AskAIModalProps) {
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	return (
		<Modal
			animationType="slide"
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
					<ThemedText>
						<AskAIScreen question={question} toggleAiModal={toggleAiModal} />
					</ThemedText>
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
	},
	modalContent: {
		width: "100%",
		height: "60%",
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});
