import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InterviewTab() {
	return (
		<ThemedView style={{ flex: 1 }}>
			<SafeAreaView>
				<ThemedText style={{ fontSize: 24, padding: 16 }}>
					This is the Interview Tab
				</ThemedText>
				<Link href="/(tabs)/(interview)/interview-chat" asChild>
					<ThemedText style={{ padding: 16 }}>Press here to interview</ThemedText>
				</Link>
			</SafeAreaView>
		</ThemedView>
	);
}
