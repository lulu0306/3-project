import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './components/Deck'
import DeckList from './components/DeckList'
import newDeck from './components/newDeck'
// import {MaterialIcons} from '@expo/vector-icons'
import { purple, blue, white, } from './utils/colors';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
