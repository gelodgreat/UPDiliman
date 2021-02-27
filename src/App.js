import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import AuthStack from './routes';
import * as eva from '@eva-design/eva';

import { GoogleSignin } from '@react-native-community/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '3056341095-161sshdpesjmhane7f8gea1ca1ma9v3a.apps.googleusercontent.com',
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
