import React from 'react';
import { Input, ListItem } from '@ui-kitten/components';
import { useState } from 'react';
import {
  Container,
  Title,
  ListView,
  AddButton,
  BtnContainer,
  RemoveButton,
  LogoutButton,
  LogoutContainer,
} from './Home.style';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [writeNote, setWriteNote] = useState('');
  const [notes, setNotes] = useState([]);
  const user = auth().currentUser;
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
  const navigation = useNavigation();

  const addNote = () => {
    database().ref(`/notes/${user.uid}`).push().set({
      note: writeNote,
    });
    setWriteNote('');
  };

  const deleteNote = (id) => {
    database().ref(`/notes/${user.uid}/${id}`).remove();
  };

  const updateNote = () => {
    database().ref(`/notes/${user.uid}/${isUpdate.id}`).update({
      note: writeNote,
    });
    setIsUpdate({ status: false, id: null });
    setWriteNote('');
  };

  const renderUIAction = (item) => {
    return (
      <RemoveButton status="danger" onPress={() => deleteNote(item)}>
        Delete
      </RemoveButton>
    );
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={item.note}
      accessoryRight={() => renderUIAction(item.id)}
      onPress={() => {
        setIsUpdate({ status: true, id: item.id });
        setWriteNote(item.note);
      }}
    />
  );

  const logout = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('Login'));
  };

  useEffect(() => {
    const onValueChange = database()
      .ref(`/notes/${user.uid}`)
      .on('value', (snapshot) => {
        const result = snapshot.val();
        if (result) {
          const values = Object.keys(result).map((item) => {
            return { ...result[item], id: item };
          });
          setNotes(values);
        } else {
          setNotes([]);
        }
      });
    return () =>
      database().ref(`/notes/${user.uid}`).off('value', onValueChange);
  }, []);

  return (
    <Container>
      <LogoutContainer>
        <TouchableOpacity onPress={logout}>
          <LogoutButton name="log-out" fill="#ef5350" />
        </TouchableOpacity>
      </LogoutContainer>
      <Title>Your One Stop Notes</Title>
      <Input
        placeholder="Your note"
        value={writeNote}
        onChangeText={(e) => {
          if (isUpdate.status && e.length === 0) {
            setIsUpdate({ status: false, id: null });
          }
          setWriteNote(e);
        }}
        label="Note"
      />
      <BtnContainer>
        <AddButton onPress={isUpdate.status ? updateNote : addNote}>
          {isUpdate.status ? `Update` : `Add`} Note
        </AddButton>
      </BtnContainer>
      <ListView data={notes} renderItem={renderItem} />
    </Container>
  );
};

export default Home;
