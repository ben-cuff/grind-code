import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InterviewTab() {
	return (
		<SafeAreaView>
			<Text>This is the interview tab</Text>
			<Link href="/(tabs)/(interview)/interview-chat" asChild>
				<Text>Press here to interview</Text>
			</Link>
		</SafeAreaView>
	);
}
