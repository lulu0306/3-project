import React from 'react';
import { StyleSheet, Text, View , StatusBar} from 'react-native';
import Deck from './components/Deck'
import reducer from './reducers/index'
import Constants from 'expo-constants';
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard';
import { createStore } from 'redux';
import { setLocalNotification } from './utils/helpers';
import { Provider } from 'react-redux';
 import {MaterialIcons} from '@expo/vector-icons'
import { purple, blue, white,pink } from './utils/colors';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import Card from './components/Card'
import Empty from './components/Empty'
import Answers from './components/Answers'


function UdaciStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
     <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}


const Tabs = createMaterialTopTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => <MaterialIcons name='home' size={24} color={tintColor} />,
        }
      },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'new Deck',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='playlist-add' size={24} color={tintColor} />
    }
  },
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: white,
      showIcon: true,
      style: {
        height: 60,
        backgroundColor: blue,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
     navigationOptions: {
      header: null,
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
       })
  },      
      Card: {
        screen: Card,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: white,
          headerStyle: {
            backgroundColor: blue,
          }
        })
      },
      Empty: {
        screen: Empty,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: white,
          headerStyle: {
            backgroundColor: blue,
          }
        })
      } ,
       Answers: {
        screen: Answers,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: white,
          headerStyle: {
            backgroundColor: blue,
          }
        })
      },
      AddCard: {
        screen: AddCard,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: white,
          headerStyle: {
            backgroundColor: blue,
          }
        })
      },
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={pink} barStyle='light-content' />
        <AppContainer/>
        </View>
      </Provider>
    );
  }
}


