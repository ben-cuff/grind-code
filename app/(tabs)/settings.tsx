import { SignOutButton } from "@/components/auth/sign-out-button";
import { SafeAreaView, Text } from "react-native";

export default function SettingsTab() {
	return (
		<SafeAreaView>
			<Text>Hello, this is the Settings Page</Text>
			<SignOutButton />
		</SafeAreaView>
	);
}
