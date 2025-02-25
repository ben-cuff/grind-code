import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/context/theme-context";
import { getThemeColors } from "@/constants/theme";
import { Modal, StyleSheet, View } from "react-native";

interface AskAIModalProps {
	isVisible: boolean;
	onClose: () => void;
	explanation: string;
}

export function AskAIModal({
	isVisible,
	onClose,
	explanation,
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
			<View style={[styles.modalContainer, { backgroundColor: colors.modal.background }]}>
				<ThemedView useGradient style={styles.modalContent}>
					<ThemedText>{explanation}</ThemedText>
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
