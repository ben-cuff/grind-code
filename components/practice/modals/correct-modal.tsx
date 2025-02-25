import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/context/theme-context";
import { getThemeColors } from "@/constants/theme";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface CorrectModalProps {
	isVisible: boolean;
	onClose: () => void;
	onNext: () => void;
	onAskAI: () => void;
}

export function CorrectModal({
	isVisible,
	onClose,
	onNext,
	onAskAI,
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
			<View style={[styles.modalContainer, { backgroundColor: colors.modal.background }]}>
				<ThemedView useGradient style={styles.modalContent}>
					<ThemedText style={styles.modalTitle}>Correct!</ThemedText>
					
					<View style={styles.buttonsRow}>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity onPress={onClose}>
								<LinearGradient
									colors={colors.button.background}
									style={styles.button}
								>
									<ThemedText style={styles.buttonText}>Try Again</ThemedText>
								</LinearGradient>
							</TouchableOpacity>
						</View>
						
						<View style={styles.buttonWrapper}>
							<TouchableOpacity onPress={onNext}>
								<LinearGradient
									colors={colors.button.background}
									style={styles.button}
								>
									<ThemedText style={styles.buttonText}>Next</ThemedText>
								</LinearGradient>
							</TouchableOpacity>
						</View>
					</View>

					<TouchableOpacity onPress={onAskAI}>
						<LinearGradient
							colors={colors.button.background}
							style={[styles.button, styles.aiButton]}
						>
							<ThemedText style={styles.buttonText}>Ask AI to Explain</ThemedText>
						</LinearGradient>
					</TouchableOpacity>
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
	},
	aiButton: {
		marginTop: 8,
		width: "100%",
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
