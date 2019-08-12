import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {search, movie} from '../mockData'
import SearchBar from '../SearchBar'
import TopMoviesList from '../TopMoviesList'


export default class HomeScreen extends React.Component {
  state = {
    search: search,
  }

  static navigationOptions = {
    headerTitle: "Browse Movies",
    headerTintColor: "dodgerblue",
  }
  
  
  render() {

    return (
      <View style={styles.container}>
        <SearchBar />
        <Text style={styles.heading}>Top Movies</Text>
        <TopMoviesList 
          // moviesList = {JSON.stringify(search)}
          moviesList = {search.Search}
          // moviesList = {[{"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","imdbID":"tt0076759","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"}]}
        />


      </View>
      
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
    heading: {
      fontSize: 30,
      marginHorizontal: 10,
      marginVertical: 15,
      fontWeight: "bold",
    },
  }
)