import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Modal, StyleSheet, View } from "react-native";
import PythonSolution from "../python-code-viewer";

interface SolutionModalProps {
	isVisible: boolean;
	onClose: () => void;
	questionNumber: number;
	setSolutionModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SolutionModal({
	isVisible,
	onClose,
	questionNumber,
	setSolutionModal,
}: SolutionModalProps) {
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
					<PythonSolution
						questionNumber={questionNumber}
						setSolutionModal={setSolutionModal}
					/>
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
