import { AlgorithmPattern } from "@/types/algorithm-pattern";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
	return (
		<View style={styles.container}>
			{options?.map((option) => (
				<TouchableOpacity
					key={option.id}
					style={[
						styles.touchable,
						currentPattern?.id === option.id && {
							borderColor: "green",
							borderWidth: 3,
							marginVertical: 3,
						},
					]}
					onPress={() =>
						currentPattern?.id === option.id
							? setCurrentPattern(null)
							: setCurrentPattern(option)
					}
				>
					<Text style={{ textAlign: "center" }}>{option.name}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		margin: 10,
	},
	touchable: {
		width: "48%",
		padding: 8,
		paddingVertical: 10,
		marginVertical: 5,
		borderWidth: 1,
		borderColor: "#000",
		borderRadius: 5,
	},
});
