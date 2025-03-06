import { Interview } from "@/types/interview";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function InterviewButton({
	interview,
	colors,
	onPress,
	getToken,
	setInterviews,
}: {
	interview: Interview;
	colors: any;
	onPress: () => void;
	getToken: () => Promise<string | null>;
	setInterviews: React.Dispatch<React.SetStateAction<Interview[]>>;
}) {
	const deleteInterview = async (interviewId: string) => {
		try {
			setInterviews((interviews) =>
				interviews.filter((i) => i.id !== interview.id)
			);
			const token = await getToken();
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/interview/${interviewId}`,
				{
					method: "DELETE",
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (response.ok) {
			} else {
				console.error("Failed to delete interview");
				const error = await response.json();
				console.error(error.error);
			}
		} catch (error) {
			console.error("Error deleting interview:", error);
		}
	};
	return (
		<Pressable
			style={[styles.buttonWrapper, { marginTop: 8 }]}
			onPress={onPress}
		>
			<LinearGradient
				colors={[
					colors.button.background[0],
					colors.button.background[1],
				]}
				style={styles.button}
			>
				<View
					style={{
						width: "100%",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<ThemedText style={styles.buttonText}>
						Question {interview.questionNumber} -{" "}
						{new Date(interview.updatedAt).toLocaleDateString()}
					</ThemedText>
					<TouchableOpacity
						onPress={(e) => {
							e.stopPropagation();
							deleteInterview(interview.id);
						}}
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					>
						<AntDesign name="close" size={16} color="#FFFFFF" />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	buttonWrapper: {
		width: "100%",
		maxWidth: 300,
		alignSelf: "center",
	},
	button: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
