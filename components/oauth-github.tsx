import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect } from "react";
import { Button, Image, Pressable, StyleSheet, View } from "react-native";

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
				setActive!({ session: createdSessionId });
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
				<Button title={message} onPress={onPress} />
				<Image
					source={{
						uri: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
					}}
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
		borderColor: "blue",
		margin: 10,
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 360,
	},
});
