import CalendarHeatmapInterviews from "@/components/home/calendar-interviews";
import CalendarHeatmapPractice from "@/components/home/calendar-practice";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Activity } from "@/types/activity";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

export default function HomeTab() {
	const [isLoading, setIsLoading] = useState(true);
	const [calendarData, setCalendarData] = useState<Activity[] | null>(null);
	const { getToken } = useAuth();

	useEffect(() => {
		async function getActivity() {
			const token = await getToken();

			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/accounts/123/activity`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const data = await response.json();

			setCalendarData(data);
			setIsLoading(false);
		}
		getActivity();
	}, []);

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
					{isLoading || !calendarData ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator color={"gray"} size={"large"} />
							<ThemedText style={styles.loadingText}>
								Loading...
							</ThemedText>
						</View>
					) : (
						<>
							<CalendarHeatmapInterviews
								calendarData={calendarData!}
							/>
							<CalendarHeatmapPractice
								calendarData={calendarData!}
							/>
						</>
					)}
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
		flex: 1,
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
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 100,
	},
	loadingText: {
		textAlign: "center",
		marginTop: 10,
		fontSize: 16,
	},
});
