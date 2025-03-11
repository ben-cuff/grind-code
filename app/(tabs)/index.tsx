import CalendarHeatmapInterviews from "@/components/home/calendar-interviews";
import CalendarHeatmapPractice from "@/components/home/calendar-practice";
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
					<ThemedView style={styles.sectionContainer}>
						<ThemedView style={styles.appInfoContainer}>
							<ThemedText style={styles.appInfoText}>
								Grind Code helps you track your coding practice
								and learning progress. Set goals, track your
								time spent coding, and improve your skills
								consistently.
							</ThemedText>
							<ThemedText style={styles.appInfoText}>
								Use this dashboard to monitor your progress and
								stay motivated on your coding journey.
							</ThemedText>
						</ThemedView>
					</ThemedView>
					<CalendarHeatmapInterviews />
					<CalendarHeatmapPractice />
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
	sectionContainer: {
		marginBottom: 24,
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
	},
});
