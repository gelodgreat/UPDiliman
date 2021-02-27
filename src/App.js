import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import AuthStack from './routes';
import * as eva from '@eva-design/eva';
import Config from 'react-native-config';
import { GoogleSignin } from '@react-native-community/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
    });
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
