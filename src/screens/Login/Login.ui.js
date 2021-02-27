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
  LoadingContainer,
} from './Login.style';
import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Spinner } from '@ui-kitten/components';

const Login = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: 'carions46@gmail.com',
    password: 'p@ssw0rd',
  });

  const createUser = () => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password,
      )
      .then(() => {
        navigation.navigate('Home');
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          loginUser();
        } else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');

          setIsLoading(false);
        } else {
          setUserCredentials({ email: '', password: '' });

          setIsLoading(false);
        }
        console.error(error);
      });
  };

  const loginUser = () => {
    auth()
      .signInWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password,
      )
      .then(() => {
        navigation.navigate('Home');
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  async function onGoogleButtonPress() {
    setIsGoogleSignInLoading(true);
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
      <Title>Welcome to Your Notes App! Making your days productive.</Title>

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
        {!isLoading ? (
          <LoginButton onPress={() => createUser()}>Login</LoginButton>
        ) : (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        )}
      </InputContainer>

      {!isGoogleSignInLoading ? (
        <GoogleSigninBtn
          size={GoogleSigninButton.Size.Wide}
          onPress={() => {
            onGoogleButtonPress()
              .then(() => {
                setIsGoogleSignInLoading(false);
                navigation.navigate('Home');
              })
              .catch((error) => {
                console.log(error);
                setIsGoogleSignInLoading(false);
              });
          }}
        />
      ) : (
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      )}

      <BottomContainer>
        <BottomText>Powered by: Diliman Solutions Challenge</BottomText>
      </BottomContainer>
    </Container>
  );
};

export default Login;
