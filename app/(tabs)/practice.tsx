import QuestionsList from "@/components/questions-list";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PracticeTab() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Practice</Text>
			<Pressable style={styles.pressable}>
				<Text style={styles.text}>Random Problem</Text>
				<View style={styles.iconContainer}>
					<Ionicons name={"shuffle"} size={28} />
				</View>
			</Pressable>
			<QuestionsList />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	pressable: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		paddingLeft: 12,
		paddingVertical: 12,
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		marginVertical: 8,
	},
	title: {
		fontSize: 48,
		color: "#333",
		textAlign: "center",
	},
	text: {
		fontSize: 24,
		color: "#333",
		marginRight: 8,
	},
	iconContainer: {
		marginLeft: "auto",
		backgroundColor: "orange",
		padding: 5,
		borderRadius: 100,
	},
});
