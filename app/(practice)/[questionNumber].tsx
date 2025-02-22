import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PracticeProblemScreen() {
	const { questionNumber } = useLocalSearchParams();

	return (
		<>
			<Stack.Screen
				options={{
					title: `Question ${questionNumber}`,
					headerStyle: {
						backgroundColor: "#fff",
					},
					headerShadowVisible: false,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<View style={styles.container}>
				<Text>Details of user {questionNumber}</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
