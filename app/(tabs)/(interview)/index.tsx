<<<<<<< HEAD:app/(tabs)/interview.tsx
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
=======
import { Link } from "expo-router";
import { Text } from "react-native";
>>>>>>> 5573ecf38ce51d0730eb37f568f74ba4dfa563e6:app/(tabs)/(interview)/index.tsx
import { SafeAreaView } from "react-native-safe-area-context";

export default function InterviewTab() {
	return (
<<<<<<< HEAD:app/(tabs)/interview.tsx
		<ThemedView style={{ flex: 1 }}>
			<SafeAreaView>
				<ThemedText style={{ fontSize: 24, padding: 16 }}>
					This is the Interview Tab
				</ThemedText>
			</SafeAreaView>
		</ThemedView>
=======
		<SafeAreaView>
			<Text>This is the interview tab</Text>
			<Link href="/(tabs)/(interview)/interview-chat" asChild>
				<Text>Press here to interview</Text>
			</Link>
		</SafeAreaView>
>>>>>>> 5573ecf38ce51d0730eb37f568f74ba4dfa563e6:app/(tabs)/(interview)/index.tsx
	);
}
