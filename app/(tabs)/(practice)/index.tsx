import QuestionsList from "@/components/questions-list";
import { Question } from "@/types/question";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PracticeTab() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [questions, setQuestions] = useState<Question[]>([]);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Practice</Text>
			<View style={styles.shuffleView}>
				<Text style={styles.text}>Random Problem</Text>
				{isLoading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size={"large"} color={"orange"} />
					</View>
				) : (
					<Pressable
						style={styles.iconContainer}
						onPress={async () => {
							setIsLoading(true);

							const randomQuestionIndex = Math.floor(
								Math.random() * questions.length
							);

							setIsLoading(false);
							router.push({
								pathname: "/(tabs)/(practice)/[questionNumber]",
								params: {
									questionNumber:
										questions[randomQuestionIndex]
											.questionNumber,
								},
							});
						}}
					>
						<Ionicons name={"shuffle"} size={28} />
					</Pressable>
				)}
			</View>
			<QuestionsList questions={questions} setQuestions={setQuestions} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	shuffleView: {
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
	loadingContainer: {
		marginLeft: "auto",
		borderRadius: 100,
	},
});
