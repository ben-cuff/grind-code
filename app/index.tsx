import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
	return (
		<View style={styles.container}>
			<SignedIn>
				<Redirect href="/(tabs)" />
			</SignedIn>
			<SignedOut>
				<ThemedView style={styles.content}>
					<Image
						source={require("@/assets/images/react-logo.png")}
						style={styles.logo}
					/>
					<ThemedText style={styles.title}>
						Welcome to GrindCode
					</ThemedText>
					<ThemedText style={styles.subtitle}>
						Your companion for coding practice and improvement
					</ThemedText>

					<View style={styles.buttonContainer}>
						<Link style={styles.button} href="/(auth)/sign-in">
							<Text style={styles.buttonText}>Sign in</Text>
						</Link>
						<Link style={styles.button} href="/(auth)/sign-up">
							<Text style={styles.buttonText}>Sign up</Text>
						</Link>
					</View>
				</ThemedView>
			</SignedOut>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	logo: {
		height: 200,
		width: 200,
		resizeMode: "contain",
		marginBottom: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		textAlign: "center",
		marginBottom: 40,
	},
	buttonContainer: {
		width: "100%",
		maxWidth: 300,
		gap: 15,
		alignItems: "center",
	},
	button: {
		backgroundColor: "#023c69",
		padding: 15,
		borderRadius: 8,
		textAlign: "center",
		width: 100,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
	},
});
