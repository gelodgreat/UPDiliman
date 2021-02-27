import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View>
      <Text>Login</Text>
      <Button
        onPress={() => {
          onGoogleButtonPress().then(() => navigation.navigate('Home'));
        }}>
        Google Signin
      </Button>
    </View>
  );
};

export default Login;
