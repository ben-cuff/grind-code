import googleLogo from "@/assets/images/7123025_logo_google_g_icon.png";
import createAccount from "@/util/account-creation";
import { useAuth, useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect } from "react";
import {
	Button,
	Image,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

export const useWarmUpBrowser = () => {
	useEffect(() => {
		// Preloads the browser for Android devices to reduce authentication load time
		// See: https://docs.expo.dev/guides/authentication/#improving-user-experience
		void WebBrowser.warmUpAsync();
		return () => {
			// Cleanup: closes browser when component unmounts
			void WebBrowser.coolDownAsync();
		};
	}, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function OAuthGoogle({ message }: { message: string }) {
	useWarmUpBrowser();

	// Use the `useSSO()` hook to access the `startSSOFlow()` method
	const { startSSOFlow } = useSSO();
	const { getToken } = useAuth();

	const onPress = useCallback(async () => {
		try {
			// Start the authentication process by calling `startSSOFlow()`
			const { createdSessionId, setActive, signIn, signUp } =
				await startSSOFlow({
					strategy: "oauth_google",
					// Defaults to current path
					redirectUrl: AuthSession.makeRedirectUri(),
				});

			// If sign in was successful, set the active session
			if (createdSessionId) {
				await setActive!({ session: createdSessionId });

				const token = await getToken();
				await createAccount(token!);
			} else {
				// If there is no `createdSessionId`,
				// there are missing requirements, such as MFA
				// Use the `signIn` or `signUp` returned from `startSSOFlow`
				// to handle next steps
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	}, []);

	return (
		<Pressable onPress={onPress}>
			<View style={styles.container}>
				{Platform.OS === "ios" ? (
					<Button title={message} onPress={onPress} />
				) : (
					<Text style={styles.button}>{message}</Text>
				)}
				<Image
					source={googleLogo}
					style={styles.image}
					resizeMode="contain"
				/>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		borderWidth: 2,
		borderRadius: 50,
		borderColor: "blue",
		margin: 10,
	},
	image: {
		width: 40,
		height: 40,
		resizeMode: "contain",
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		textAlign: "center",
		fontSize: 16,
		color: "blue",
		borderRadius: 6,
	},
});
