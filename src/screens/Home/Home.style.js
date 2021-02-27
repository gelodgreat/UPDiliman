import styled from '@emotion/native';
import { Text, Button, List, Icon } from '@ui-kitten/components';

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
export const LogoutButton = styled(Icon)`
  width: 24px;
  height: 24px;
`;
export const LogoutContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 8px;
  margin-top: 8px;
`;
