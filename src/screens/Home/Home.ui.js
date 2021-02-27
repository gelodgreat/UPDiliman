import React from 'react';
import { Input, ListItem } from '@ui-kitten/components';
import { useState } from 'react';
import {
  Container,
  Title,
  ListView,
  AddButton,
  BtnContainer,
} from './Home.style';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';

const Home = () => {
  const [writeNote, setWriteNote] = useState('');
  const [notes, setNotes] = useState([]);
  const user = auth().currentUser;

  const addNote = () => {
    database().ref(`/notes/${user.uid}`).push().set({
      note: writeNote,
    });
    setWriteNote('');
  };

  const renderItem = ({ item, index }) => <ListItem title={item.note} />;

  useEffect(() => {
    const onValueChange = database()
      .ref(`/notes/${user.uid}`)
      .on('value', (snapshot) => {
        const result = snapshot.val();
        const values = Object.keys(result).map((item) => {
          return result[item];
        });
        setNotes(values);
      });
    return () =>
      database().ref(`/notes/${user.uid}`).off('value', onValueChange);
  }, []);

  return (
    <Container>
      <Title>Your One Stop Notes</Title>

      <Input
        placeholder="Your note"
        value={writeNote}
        onChangeText={setWriteNote}
      />

      <BtnContainer>
        <AddButton onPress={addNote}>Add Note</AddButton>
      </BtnContainer>

      <ListView data={notes} renderItem={renderItem} />
    </Container>
  );
};

export default Home;
