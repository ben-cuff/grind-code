export default async function createAccount(token: String) {
	try {
		const response = await fetch(
			`${process.env.EXPO_PUBLIC_BASE_URL}/accounts`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.status == 409) {
			return;
		}
		if (!response.ok) {
			const data = await response.json();
			console.error("error: " + data.error);
			return;
		}
		return;
	} catch (error) {
		console.error("error: " + error);
	}
}
