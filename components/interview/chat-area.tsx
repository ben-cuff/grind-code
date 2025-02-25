import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { Message } from "@/types/message";
import Markdown from "@ronradtke/react-native-markdown-display";
import {
	ScrollView,
	StyleSheet,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";

export default function ChatArea({ messages }: { messages: Message[] }) {
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	const markdownStyle = {
		body: {
			color: colors.text,
			fontSize: 16,
			lineHeight: 24,
		},
		code_inline: {
			color: colors.text,
		},
		code_block: {
			color: colors.text,
		},
		fence: {
			color: colors.text,
		},
		link: {
			color: colors.primary,
		},
	};

	return (
		<ThemedView
			style={[styles.container, { backgroundColor: colors.surfaceAlt }]}
		>
			<ScrollView>
				{messages.map((msg) => {
					const isUser = msg.role === "user";
					return (
						<View
							key={msg.id}
							style={[
								styles.messageContainer,
								{
									alignSelf: isUser
										? "flex-end"
										: "flex-start",
									backgroundColor: isUser
										? colors.primary
										: colors.background[1],
								},
							]}
						>
							<View
								style={[
									styles.profile,
									{
										backgroundColor: isUser
											? colors.button.background[1]
											: colors.button.background[0],
									},
								]}
							>
								<ThemedText style={styles.profileText}>
									{isUser ? "ME" : "AI"}
								</ThemedText>
							</View>
							<View style={styles.messageContent}>
								<Markdown
									style={
										isUser
											? {
													...markdownStyle,
													body: {
														...markdownStyle.body,
														color: "#E5E5E7",
													},
											  }
											: markdownStyle
									}
								>
									{msg.content}
								</Markdown>
							</View>
						</View>
					);
				})}
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		borderRadius: 12,
		marginBottom: 16,
		flexGrow: 1,
	} as ViewStyle,
	messageContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		padding: 12,
		borderRadius: 12,
		maxWidth: "80%",
		marginBottom: 12,
	} as ViewStyle,
	profile: {
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 8,
	} as ViewStyle,
	profileText: {
		color: "#FFFFFF",
		fontSize: 12,
		fontWeight: "600",
	} as TextStyle,
	messageContent: {
		flex: 1,
	} as ViewStyle,
});
