import styled from '@emotion/native';

import { Text, Button, List, Input } from '@ui-kitten/components';
import { GoogleSigninButton } from '@react-native-community/google-signin';

export const Container = styled.View`
  width: 100%;
  padding: 12px 24px 0px 24px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

export const GoogleSigninBtn = styled(GoogleSigninButton)`
  width: 300px;
  height: 48px;
`;

export const InputContainer = styled.View`
  flex-direction: column;
  margin-top: 48px;
  margin-bottom: 20px;
`;
export const TextInput = styled(Input)`
  width: 300px;
`;
export const LoginButton = styled(Button)`
  margin-top: 8px;
`;

export const BottomContainer = styled.View`
  position: absolute;
  bottom: 0;
`;

export const BottomText = styled(Text)`
  font-size: 12px;
`;
