import OAuthGitHub from "@/components/auth/oauth-github";
import OAuthGoogle from "@/components/auth/oauth-google";
import createAccount from "@/utils/account-creation";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import {
	Alert,
	Button,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SignInPage() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const { getToken } = useAuth();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = React.useState("");
	const [password, setPassword] = React.useState("");

	// Handle the submission of the sign-in form
	const onSignInPress = React.useCallback(async () => {
		if (!isLoaded) return;

		// Start the sign-in process using the email and password provided
		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			});

			// If sign-in process is complete, set the created session as active
			// and redirect the user
			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });

				const token = await getToken();
				await createAccount(token!);
				router.replace("/");
			} else {
				// If the status isn't complete, check why. User might need to
				// complete further steps.
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			Alert.alert((err as any).errors[0].longMessage);
			console.error(JSON.stringify(err, null, 2));
		}
	}, [isLoaded, emailAddress, password]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView style={styles.container}>
				<Image
					source={require("@/assets/images/react-logo.png")}
					style={styles.logo}
				/>
				<Text style={styles.title}>Login</Text>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={20}
				>
					<View style={styles.inputContainer}>
						<Ionicons
							name="mail-outline"
							size={25}
							style={styles.icon}
						/>

						<TextInput
							autoCapitalize="none"
							value={emailAddress}
							keyboardType="email-address"
							placeholder="Enter email"
							placeholderTextColor="#888"
							onChangeText={(emailAddress) =>
								setEmailAddress(emailAddress)
							}
							style={styles.input}
						/>
					</View>
				</KeyboardAvoidingView>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={20}
				>
					<View style={styles.inputContainer}>
						<Ionicons
							name="lock-closed-outline"
							size={25}
							style={styles.icon}
						/>
						<TextInput
							value={password}
							placeholder="Enter password"
							placeholderTextColor="#888"
							secureTextEntry={true}
							onChangeText={(password) => setPassword(password)}
							style={styles.input}
						/>
					</View>
					<Button title="Sign in" onPress={onSignInPress} />
				</KeyboardAvoidingView>
				<OAuthGoogle message="Sign in with Google" />
				<OAuthGitHub message="Sign in with GitHub" />
				<View style={{ alignItems: "center" }}>
					<Text style={{ fontSize: 20, marginTop: 20 }}>
						Don't have an account?
					</Text>
					<Button
						title="Sign Up"
						onPress={() => router.push("/sign-up")}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
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
		marginBottom: 40,
		fontWeight: "bold",
		color: "black",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		height: 50,
		backgroundColor: "#f1f1f1",
		borderRadius: 8,
		paddingHorizontal: 10,
		marginBottom: 20,
	},
	icon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		height: "100%",
		fontSize: 20,
	},
});
