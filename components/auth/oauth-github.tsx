import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import createAccount from "@/utils/account-creation";
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
	View,
} from "react-native";
import { ThemedText } from "../themed-text";

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

export default function OAuthGitHub({ message }: { message: string }) {
	useWarmUpBrowser();

	// Use the `useSSO()` hook to access the `startSSOFlow()` method
	const { startSSOFlow } = useSSO();
	const { getToken } = useAuth();

	const { theme } = useTheme();
	const colors = getThemeColors(theme === "dark");

	const onPress = useCallback(async () => {
		try {
			// Start the authentication process by calling `startSSOFlow()`
			const { createdSessionId, setActive, signIn, signUp } =
				await startSSOFlow({
					strategy: "oauth_github",
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
			<View
				style={[
					styles.container,
					{
						backgroundColor: colors.card[1],
					},
				]}
			>
				{Platform.OS === "ios" ? (
					<Button title={message} onPress={onPress} />
				) : (
					<ThemedText style={styles.button}>{message}</ThemedText>
				)}
				<Image
					source={
						theme === "dark"
							? require("@/assets/images/github-mark-white.png")
							: require("@/assets/images/github-mark.png")
					}
					style={styles.image}
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
		margin: 10,
		padding: 4,
	},
	image: {
		width: 32,
		height: 32,
		borderRadius: 360,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		textAlign: "center",
		fontSize: 16,
		borderRadius: 6,
	},
});
