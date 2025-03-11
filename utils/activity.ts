import { Activity } from "@/types/activity";

export const fetchActivity = async (
	getToken: () => Promise<string | null>,
	setCalendarData: React.Dispatch<React.SetStateAction<Activity[] | null>>
) => {
	try {
		const token = await getToken();
		const response = await fetch(
			`${process.env.EXPO_PUBLIC_BASE_URL}/accounts/123/activity`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const data = await response.json();
		setCalendarData(data);
		return data;
	} catch (error) {
		console.error("Failed to fetch data:", error);
		return null;
	}
};
