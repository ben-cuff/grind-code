import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Activity } from "@/types/activity";
import { StyleSheet, View } from "react-native";
import CalendarHeatmap from "react-native-calendar-heatmap";
import { ThemedText } from "../themed-text";

export default function CalendarHeatmapCombined({
	calendarData,
	title,
	route,
}: {
	calendarData: Activity[];
	title: String;
	route: string;
}) {
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	const values = calendarData.flatMap((item) => {
		const count =
			route === "practice" ? item.practiceCount : item.interviewCount;
		return Array.from({ length: count || 0 }, () => ({
			date: new Date(item.date).toISOString().split("T")[0],
		}));
	});

	const endDate = new Date();
	endDate.setDate(endDate.getDate() - 1);

	return (
		<View
			style={[
				{
					backgroundColor: colors.surface,
				},
				styles.container,
			]}
		>
			<ThemedText style={styles.text}>{title}</ThemedText>
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

const styles = StyleSheet.create({
	container: { alignSelf: "stretch", flex: 1, padding: 16 },
	text: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 24,
		marginBottom: 6,
	},
});
