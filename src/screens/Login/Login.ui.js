import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  GoogleSigninBtn,
  Title,
  InputContainer,
  TextInput,
  LoginButton,
  BottomContainer,
  BottomText,
} from './Login.style';
import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from '@ui-kitten/components';

const Login = () => {
  const navigation = useNavigation();
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Container>
      <Title>Welcome to React Native with Firebase!</Title>

      <InputContainer>
        <TextInput
          label="Email"
          keyboardType="email-address"
          value={userCredentials.email}
          onChangeText={(e) => {
            setUserCredentials({ ...userCredentials, email: e });
          }}></TextInput>
        <TextInput
          label="Password"
          secureTextEntry={secureTextEntry}
          caption="Should contain at least 6 symbols"
          accessoryRight={renderIcon}
          value={userCredentials.password}
          onChangeText={(e) => {
            setUserCredentials({ ...userCredentials, password: e });
          }}></TextInput>
        <LoginButton onPress={() => {}}>Login</LoginButton>
      </InputContainer>

      <GoogleSigninBtn
        size={GoogleSigninButton.Size.Wide}
        onPress={() => {
          onGoogleButtonPress().then(() => navigation.navigate('Home'));
        }}></GoogleSigninBtn>

      <BottomContainer>
        <BottomText>Powered by: Diliman Solutions Challenge</BottomText>
      </BottomContainer>
    </Container>
  );
};

export default Login;
