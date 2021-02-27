import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import AuthStack from './routes';
import * as eva from '@eva-design/eva';
import Config from 'react-native-config';
import { GoogleSignin } from '@react-native-community/google-signin';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
    });
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
