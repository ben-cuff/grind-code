import { AlgorithmPattern, algorithmPatterns } from "@/types/algorithm-pattern";
import { Question } from "@/types/question";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QuestionOptions from "./question-options";

export default function QuestionDisplay({
	question,
	toggleCorrectModal,
}: {
	question: Question;
	toggleCorrectModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [options, setOptions] = useState<AlgorithmPattern[] | null>();
	const [currentPattern, setCurrentPattern] =
		useState<AlgorithmPattern | null>();
	useEffect(() => {
		const solution = algorithmPatterns.find(
			({ id }) => id === question?.pattern
		);
		// picks 3 random patterns, adds the answer and then randomizes the order
		setOptions(
			[
				...(solution ? [solution] : []),
				...algorithmPatterns
					.filter(({ id }) => id !== question?.pattern)
					.sort(() => Math.random() - 0.5)
					.slice(0, 3),
			].sort(() => Math.random() - 0.5)
		);
	}, [question]);

	const onSubmit = () => {
		if (currentPattern?.id === question?.pattern) {
			toggleCorrectModal(true);
			return;
		}
		Alert.alert("Incorrect", "Please try again");
	};
	return (
		<View style={{ paddingBottom: 80 }}>
			<View style={styles.questionContainer}>
				<Text style={styles.questionTitle}>{question?.name}</Text>
				<Text style={styles.questionPrompt}>{question?.prompt}</Text>
			</View>
			<View>
				<Text style={[styles.questionTitle, { textAlign: "center" }]}>
					Which algorithm pattern is used?
				</Text>
				<QuestionOptions
					options={options!}
					currentPattern={currentPattern!}
					setCurrentPattern={setCurrentPattern!}
				/>
				<View
					style={{
						alignItems: "center",
						flex: 1,
					}}
				>
					<TouchableOpacity
						style={styles.touchable}
						onPress={onSubmit}
					>
						<Text
							style={{
								color: "#fff",
								textAlign: "center",
							}}
						>
							Submit
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	questionContainer: {
		padding: 16,
		margin: 16,
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	questionTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	questionPrompt: {
		fontSize: 20,
		color: "#333",
	},
	touchable: {
		padding: 10,
		marginVertical: 5,
		backgroundColor: "#007AFF",
		borderRadius: 5,
		alignItems: "center",
		width: "20%",
	},
});
