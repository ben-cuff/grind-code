import { SignOutButton } from "@/components/sign-out-button";
import { SignedIn, SignedOut, useSession } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	const session = useSession();
	console.log(JSON.stringify(session.session?.user.id, null, 2));
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<SignedIn>
				<Text>Edit app/index.tsx to edit this screen.</Text>
				<SignOutButton />
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
