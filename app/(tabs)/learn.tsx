import Accordion from "@/components/interview/accordion";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { algorithmPatterns } from "@/types/algorithm-pattern";
import Markdown from "@ronradtke/react-native-markdown-display";
import { SafeAreaView, ScrollView } from "react-native";

export default function LearnScreen() {
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
			backgroundColor: colors.code,
		},
		code_block: {
			color: colors.text,
			backgroundColor: colors.code,
		},
		fence: {
			color: colors.text,
			backgroundColor: colors.code,
		},
		link: {
			color: colors.primary,
		},
	};

	return (
		<ThemedView style={{ flex: 1 }}>
			<SafeAreaView>
				<ThemedText style={{ fontSize: 48, alignSelf: "center" }}>
					Learning
				</ThemedText>
				<ScrollView style={{ marginBottom: 56, padding: 16 }}>
					{algorithmPatterns.map((pattern) => (
						<Accordion
							key={pattern.name}
							title={pattern.name}
							titleStyle={{ fontSize: 24 }}
						>
							<Markdown style={markdownStyle}>
								{pattern.description}
							</Markdown>
						</Accordion>
					))}
				</ScrollView>
			</SafeAreaView>
		</ThemedView>
	);
}
