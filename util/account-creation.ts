import { useAuth } from "@clerk/clerk-expo";

export default async function createAccount() {
	const { getToken } = useAuth();
	try {
		const token = await getToken();

		console.log("token: " + token);

		const response = await fetch(`http://localhost:3000/accounts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		console.log(response);

		if (response.status == 409) {
			const data = await response.json();
			console.log(data?.error);
			return;
		}
		if (response.ok) {
			const data = await response.json();
			console.log(JSON.stringify(data, null, 2));
			return;
		}
	} catch (error) {
		console.error("error: " + error);
	}
}
