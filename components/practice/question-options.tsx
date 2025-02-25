import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/theme-context";
import { getThemeColors } from "@/constants/theme";
import { AlgorithmPattern } from "@/types/algorithm-pattern";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function QuestionOptions({
	options,
	currentPattern,
	setCurrentPattern,
}: {
	options: AlgorithmPattern[];
	currentPattern: AlgorithmPattern | null;
	setCurrentPattern: React.Dispatch<
		React.SetStateAction<AlgorithmPattern | null | undefined>
	>;
}) {
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	return (
		<View style={styles.container}>
			{options?.map((option) => (
				<TouchableOpacity
					key={option.id}
					style={[
						styles.touchable,
						{ backgroundColor: colors.surfaceAlt },
						currentPattern?.id === option.id && {
							borderColor: colors.primary,
							borderWidth: 2,
						},
					]}
					onPress={() =>
						currentPattern?.id === option.id
							? setCurrentPattern(null)
							: setCurrentPattern(option)
					}
				>
					<ThemedText style={styles.optionText}>{option.name}</ThemedText>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 12,
		padding: 16,
	},
	touchable: {
		padding: 12,
		borderRadius: 8,
		minWidth: 120,
	},
	optionText: {
		textAlign: "center",
		fontSize: 14,
		fontWeight: "500",
	},
});
