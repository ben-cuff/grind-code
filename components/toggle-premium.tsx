import { Button } from "react-native";

export default function TogglePremium({ token }: { token: string }) {
	const onPress = async () => {
		console.log("attempting call");
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

		const data = response.json();

		console.log(data);
	};

	return <Button title="Go Premium" onPress={onPress} />;
}
