import { Button } from "react-native";

export default function TogglePremium({ token }: { token: string }) {
	const onPress = async () => {
		const response = await fetch(
			`${process.env.EXPO_PUBLIC_BASE_URL}/accounts/premium`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to toggle premium status");
		}
	};

	return <Button title="Go Premium" onPress={onPress} />;
}
