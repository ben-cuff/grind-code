import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Animated, FlatList, StyleSheet, Text, View } from "react-native";

type Question = {
	createdAt: string;
	id: string;
	name: string;
	pattern: string;
	prompt: string;
	questionNumber: number;
	solutionRoute: string;
	updatedAt: string;
	urlQuestion: string;
	urlSolution: string;
};

export default function QuestionsList() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchQuestions() {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/questions`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();

			setQuestions(data);

			setIsLoading(false);
		}
		fetchQuestions();
	}, []);

	return isLoading ? (
		<FlatList
			data={Array.from({ length: 10 })}
			keyExtractor={(_, index) => index.toString()}
			renderItem={() => (
				<View style={styles.container}>
					<Animated.View
						style={[styles.skeleton, { opacity: pulseAnimation }]}
					/>
					<View style={styles.iconContainer}>
						<Ionicons
							name={"arrow-forward-circle-outline"}
							color={"white"}
							size={28}
						/>
					</View>
				</View>
			)}
		/>
	) : (
		<FlatList
			data={questions}
			renderItem={handleRenderList}
			keyExtractor={(item) => item.id}
		/>
	);
}

const handleRenderList = ({ item }: { item: Question }) => (
	<View style={styles.container}>
		<Text style={styles.text}>{item.name}</Text>
		<View style={styles.iconContainer}>
			<Ionicons
				name={"arrow-forward-circle-outline"}
				color={"white"}
				size={28}
			/>
		</View>
	</View>
);

const pulseAnimation = new Animated.Value(1);

Animated.loop(
	Animated.sequence([
		Animated.timing(pulseAnimation, {
			toValue: 0.3,
			duration: 1000,
			useNativeDriver: true,
		}),
		Animated.timing(pulseAnimation, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}),
	])
).start();

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		marginVertical: 4,
	},
	text: {
		fontSize: 20,
		color: "#333",
		marginRight: 8,
	},
	iconContainer: {
		marginLeft: "auto",
		backgroundColor: "#2b7fff",
		padding: 5,
		borderRadius: 100,
	},
	skeleton: {
		backgroundColor: "#ccc",
		padding: 5,
		width: "80%",
		height: "95%",
		borderRadius: 4,
	},
});
