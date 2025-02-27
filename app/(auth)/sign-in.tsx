import OAuthGitHub from "@/components/auth/oauth-github";
import OAuthGoogle from "@/components/auth/oauth-google";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
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
	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

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
			<ThemedView style={{ flex: 1 }}>
				<SafeAreaView style={styles.container}>
					<Image
						source={require("@/assets/images/react-logo.png")}
						style={styles.logo}
					/>
					<ThemedText style={styles.title}>Login</ThemedText>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						keyboardVerticalOffset={20}
					>
						<View
							style={[
								styles.inputContainer,
								{
									backgroundColor: colors.surface,
									borderColor: colors.text,
									borderWidth: 2,
								},
							]}
						>
							<Ionicons
								name="mail-outline"
								size={25}
								style={styles.icon}
								color={colors.text}
							/>

							<TextInput
								autoCapitalize="none"
								value={emailAddress}
								keyboardType="email-address"
								placeholder="Enter email"
								placeholderTextColor={colors.text}
								onChangeText={(emailAddress) =>
									setEmailAddress(emailAddress)
								}
								style={[styles.input, { color: colors.text }]}
							/>
						</View>
					</KeyboardAvoidingView>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						keyboardVerticalOffset={20}
					>
						<View
							style={[
								styles.inputContainer,
								{
									backgroundColor: colors.surface,
									borderColor: colors.text,
									borderWidth: 2,
								},
							]}
						>
							<Ionicons
								name="lock-closed-outline"
								size={25}
								style={styles.icon}
								color={colors.text}
							/>
							<TextInput
								value={password}
								placeholder="Enter password"
								placeholderTextColor={colors.text}
								secureTextEntry={true}
								style={[styles.input, { color: colors.text }]}
								onChangeText={(password) =>
									setPassword(password)
								}
							/>
						</View>
						<Button title="Sign in" onPress={onSignInPress} />
					</KeyboardAvoidingView>
					<OAuthGoogle message="Sign in with Google" />
					<OAuthGitHub message="Sign in with GitHub" />
					<View style={{ alignItems: "center" }}>
						<ThemedText style={{ fontSize: 20, marginTop: 20 }}>
							Don't have an account?
						</ThemedText>
						<Button
							title="Sign Up"
							onPress={() => router.push("/sign-up")}
						/>
					</View>
				</SafeAreaView>
			</ThemedView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
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
		marginBottom: 40,
		fontWeight: "bold",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		height: 50,
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
