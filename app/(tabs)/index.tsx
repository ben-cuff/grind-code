import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native";

export default function HomeTab() {
	return (
		<ThemedView style={{ flex: 1 }}>
			<SafeAreaView>
				<ThemedText style={{ fontSize: 24, padding: 16 }}>
					Hello, this is the Home Tab
				</ThemedText>
			</SafeAreaView>
		</ThemedView>
	);
}
