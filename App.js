import React from 'react';
import { StyleSheet, } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import SearchResultsScreen from './screens/SearchResultsScreen'
import MovieDetailsScreen from './screens/MovieDetailsScreen'
import ErrorScreen from './screens/ErrorScreen';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import {store} from './redux/store'

import {Provider} from 'react-redux'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    SearchResults: SearchResultsScreen,
    MovieDetails: MovieDetailsScreen,
    Error: ErrorScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerTintColor: "dodgerblue",
    },
  },
)

const AppContainer = createAppContainer(AppNavigator)


export default class App extends React.Component {

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
  }

  render() {
    return (
      <Provider store = {store}>
        <AppContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

});
