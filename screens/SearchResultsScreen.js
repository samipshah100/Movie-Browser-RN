import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { search, movie } from '../mockData'
import SearchBar from '../SearchBar'
import TopMoviesList from '../TopMoviesList'

export default class SearchResultsScreen extends React.Component {
  state = {
    isLoading: true,
  }

  static navigationOptions = {
    headerTitle: "Search Results",
    headerTintColor: "dodgerblue",
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Showing results for: "{this.props.navigation.getParam('searchString')}"</Text>
        <TopMoviesList
          moviesList={this.props.navigation.getParam('jsonResponse').Search}
          
          //moviesList takes an OBJECT ARRAY ^
        
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
      fontSize: 20,
      marginHorizontal: 10,
      marginVertical: 15,
      fontWeight: "bold",
    },
  }
)