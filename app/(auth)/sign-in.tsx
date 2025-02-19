import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
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
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 40, alignSelf: "center" }}>Login</Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 20, padding: 5 }}>Email</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          style={{ fontSize: 20, borderWidth: 1, borderRadius: 5, flexGrow: 1 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 20, padding: 5 }}>Password</Text>
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={{ fontSize: 20, borderWidth: 1, borderRadius: 5, flexGrow: 1 }}
        />
      </View>
      <Button title="Sign in" onPress={onSignInPress} />
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, padding: 5 }}>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text style={{ fontSize: 20, padding: 5 }}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
