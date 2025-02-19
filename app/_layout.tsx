import { tokenCache } from "@/cache";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<ClerkProvider
			publishableKey={process.env.publishableKey!}
			tokenCache={tokenCache}
		>
			<ClerkLoaded>
				<Stack
					screenOptions={({ route }) => ({
						headerShown: route.name !== "index",
						headerTitle: "",
						headerBackTitle: "",
					})}
				/>
			</ClerkLoaded>
		</ClerkProvider>
	);
}
