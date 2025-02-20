import OAuthGitHub from "@/components/oauth-github";
import OAuthGoogle from "@/components/oauth-google";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as React from "react";
import {
	Alert,
	Button,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SignUpScreen() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [pendingVerification, setPendingVerification] = React.useState(false);
	const [code, setCode] = React.useState("");

	// Handle submission of sign-up form
	const onSignUpPress = async () => {
		if (!isLoaded) return;

		// Start sign-up process using email and password provided
		try {
			if (password != confirmPassword) {
				Alert.alert("Passwords do not match");
				setPassword("");
				setConfirmPassword("");
				return;
			}

			await signUp.create({
				emailAddress,
				password,
			});

			// Send user an email with verification code
			await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			});

			// Set 'pendingVerification' to true to display second form
			// and capture OTP code
			setPendingVerification(true);
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			Alert.alert((err as any).errors[0].longMessage);
		}
	};

	// Handle submission of verification form
	const onVerifyPress = async () => {
		if (!isLoaded) return;

		try {
			// Use the code the user provided to attempt verification
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code,
			});

			// If verification was completed, set the session to active
			// and redirect the user
			if (signUpAttempt.status === "complete") {
				await setActive({ session: signUpAttempt.createdSessionId });
				router.replace("/");
			} else {
				// If the status is not complete, check why. User may need to
				// complete further steps.
				console.error(JSON.stringify(signUpAttempt, null, 2));
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			Alert.alert((err as any).errors[0].longMessage);
			console.error(JSON.stringify(err, null, 2));
		}
	};

	if (pendingVerification) {
		return (
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<SafeAreaView style={styles.container}>
					<Image
						source={require("@/assets/images/react-logo.png")}
						style={styles.logo}
					/>
					<Text style={styles.title}>Verify your email</Text>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						keyboardVerticalOffset={20}
					>
						<View style={styles.inputContainer}>
							<TextInput
								value={code}
								placeholder="Enter your verification code"
								placeholderTextColor="#888"
								onChangeText={setCode}
								maxLength={6}
								keyboardType="number-pad"
								returnKeyType="done"
								onSubmitEditing={() => Keyboard.dismiss()}
								style={{ ...styles.input, textAlign: "center" }}
							/>
						</View>
						<Button title="Verify" onPress={onVerifyPress} />
					</KeyboardAvoidingView>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView style={styles.container}>
				<Image
					source={require("@/assets/images/react-logo.png")}
					style={styles.logo}
				/>
				<Text style={styles.title}>Sign Up</Text>
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
							value={confirmPassword}
							placeholder="Enter password again"
							placeholderTextColor="#888"
							secureTextEntry={true}
							onChangeText={(confirmPassword) =>
								setConfirmPassword(confirmPassword)
							}
							style={styles.input}
						/>
					</View>
					<Button title="Continue" onPress={onSignUpPress} />
				</KeyboardAvoidingView>
				<OAuthGoogle message="Sign up with Google" />
				<OAuthGitHub message="Sign up with GitHub" />
				<View style={{ alignItems: "center" }}>
					<Text style={{ fontSize: 20, marginTop: 20 }}>
						Already have an account?
					</Text>
					<Button
						title="Sign In"
						onPress={() => router.push("/sign-in")}
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
