import { Message } from "@/app/(tabs)/(interview)/interview-chat";
import Markdown from "@ronradtke/react-native-markdown-display";
import { StyleSheet, Text, View } from "react-native";

export default function ChatArea({ messages }: { messages: Message[] }) {
	return (
		<View
			style={{
				padding: 10,
				backgroundColor: "#f9f9f9",
				borderRadius: 8,
				marginBottom: 20,
			}}
		>
			{messages.map((msg, index) => {
				const isUser = msg.role === "user";
				return (
					<View
						key={msg.id}
						style={[
							{
								flexDirection: isUser ? "row-reverse" : "row",
								backgroundColor: isUser ? "#dcf8c6" : "#fff",
								alignSelf: isUser ? "flex-end" : "flex-start",
							},
							styles.container,
						]}
					>
						<View
							style={[
								{
									backgroundColor: isUser
										? "#007AFF"
										: "#FF9500",
								},
								styles.profile,
							]}
						>
							<Text
								style={{
									color: "#fff",
									fontWeight: "bold",
								}}
							>
								{isUser ? "ME" : "AI"}
							</Text>
						</View>
						<Markdown>{msg.content}</Markdown>
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		borderRadius: 5,
		maxWidth: "80%",
		height: "auto",
		width: "auto",
		alignItems: "center",
	},
	profile: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 8,
	},
});
