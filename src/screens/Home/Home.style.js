import styled from '@emotion/native';

import { Text, Input, Button, List, ListItem } from '@ui-kitten/components';
import { RectButton } from 'react-native-gesture-handler';
export const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

export const ListView = styled(List)`
  margin-top: 24px;
`;

export const Container = styled.View`
  padding: 12px 24px 0px 24px;
`;

export const AddButton = styled(Button)`
  width: 150px;
  border-radius: 8px;
`;

export const BtnContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 8px;
`;

export const RemoveButton = styled(Button)``;
