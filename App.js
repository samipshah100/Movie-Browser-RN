import React from 'react';
import { StyleSheet,  } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'

const AppNavigator = createStackNavigator (
  {
    Home: HomeScreen, 
    SearchResults: "SearchResultsScreen",
    // MovieDetails: "MovieDetailsScreen",
  },
  {
    initialRouteName: "Home",
    headerLayoutPreset : "center",
  },
)

const AppContainer = createAppContainer (AppNavigator)


export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
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
