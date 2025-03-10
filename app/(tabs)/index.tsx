import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function HomeTab() {
	return (
		<ThemedView style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<ThemedText style={styles.headerTitle}>
						Dashboard
					</ThemedText>

					<ThemedView style={styles.statsContainer}>
						<ThemedView style={styles.statCard}>
							<ThemedText style={styles.statValue}>42</ThemedText>
							<ThemedText style={styles.statLabel}>
								Tasks
							</ThemedText>
						</ThemedView>
						<ThemedView style={styles.statCard}>
							<ThemedText style={styles.statValue}>7</ThemedText>
							<ThemedText style={styles.statLabel}>
								Completed
							</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.sectionContainer}>
						<ThemedText style={styles.sectionTitle}>
							About This App
						</ThemedText>
						<ThemedView style={styles.appInfoContainer}>
							<ThemedText style={styles.appInfoText}>
								Grind Code helps you track your coding practice and learning progress. 
								Set goals, track your time spent coding, and improve your skills consistently.
							</ThemedText>
							<ThemedText style={styles.appInfoText}>
								Use this dashboard to monitor your progress and stay motivated on your 
								coding journey.
							</ThemedText>
						</ThemedView>
					</ThemedView>
				</ScrollView>
			</SafeAreaView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	safeArea: {
		flex: 1,
	},
	scrollContent: {
		padding: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 24,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: "bold",
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 24,
	},
	statCard: {
		backgroundColor: "#f0f0f0",
		borderRadius: 12,
		padding: 16,
		width: "45%",
		alignItems: "center",
	},
	statValue: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 14,
		color: "#666",
	},
	sectionContainer: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 16,
	},
	appInfoContainer: {
		padding: 16,
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
	},
	appInfoText: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 12,
	}
});
