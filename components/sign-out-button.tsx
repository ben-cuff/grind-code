import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Button } from "react-native";

export const SignOutButton = () => {
	const { signOut } = useClerk();

	const handleSignOut = async () => {
		try {
			await signOut();
			// Redirect to the sign-in page
			router.replace("/(auth)/sign-in");
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return <Button title="Sign out" onPress={handleSignOut} />;
};
