import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Activity } from "@/types/activity";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CalendarHeatmap from "react-native-calendar-heatmap";
import { ThemedText } from "../themed-text";

export default function CalendarHeatmapInterviews() {
	const [calendarData, setCalendarData] = useState<Activity[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { getToken } = useAuth();
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

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

			console.log(data);

			setCalendarData(data);
			setIsLoading(false);
		}
		getActivity();
	}, []);

	if (isLoading || !calendarData) {
		return <Text>Loading calendar data...</Text>;
	}

	const values = calendarData.map((item) => ({
		date: new Date(item.date).toISOString().split("T")[0],
		count: item.interviewCount,
	}));

	const endDate = new Date();

	return (
		<View
			style={{
				backgroundColor: colors.surface,
				alignSelf: "stretch",
				flex: 1,
				padding: 16,
			}}
		>
			<ThemedText
				style={{
					fontWeight: "bold",
					textAlign: "center",
					fontSize: 24,
					marginBottom: 6,
				}}
			>
				Interview Activity
			</ThemedText>
			<CalendarHeatmap
				endDate={endDate}
				numDays={90}
				values={values}
				monthLabelsColor={colors.text}
				colorArray={[
					theme === "dark" ? colors.modal.surface[1] : colors.border,
					"#c6e48b",
					"#7bc96f",
					"#239a3b",
					"#196127",
				]}
			/>
		</View>
	);
}
