import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	const user = useUser();
	console.log(JSON.stringify(user?.user?.id, null, 2));
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<SignedIn>
				<Redirect href="/(tabs)" />
			</SignedIn>
			<SignedOut>
				<Link
					style={{
						padding: 5,
						borderWidth: 1,
						borderRadius: 5,
						margin: 10,
					}}
					href="/(auth)/sign-in"
				>
					<Text style={{ fontSize: 20 }}>Sign in</Text>
				</Link>
				<Link
					style={{
						padding: 5,
						borderWidth: 1,
						borderRadius: 5,
						margin: 10,
					}}
					href="/(auth)/sign-up"
				>
					<Text style={{ fontSize: 20 }}>Sign up</Text>
				</Link>
			</SignedOut>
		</View>
	);
}
