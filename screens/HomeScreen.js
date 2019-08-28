import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { search, movie } from '../mockData'
import SearchBar from '../SearchBar'
import TopMoviesList from '../TopMoviesList'
import SearchResultsScreen from './SearchResultsScreen';
import { API_KEY } from '../ApiKey'

var data = "failed"
var i = 1

export default class HomeScreen extends React.Component {
  state = {
    search: search,
    dataString: "",
    searchError: false,
  }

  static navigationOptions = {
    headerTitle: "Browse Movies",
    headerTintColor: "dodgerblue",
    // header: null,
  }

  formSubmitted = (q) => {
    this.props.navigation.navigate('SearchResults', { q: q })
  }

  addIndex = (searchArr) => {
    var searchWithIndex = searchArr.map(
      (obj) => {
        let rObj = { i: i.toString(), ...obj }
        i++
        return rObj
      }
    )
    return searchWithIndex
  }

  // showMovieDetails = (id) => {
  //   fetch(`http://www.omdbapi.com/?i='tt0120915'&apikey=${API_KEY}}`)
  //   .then(
  //     response => response.json()
  //   )
  //   .then(
  //     responseObj => {
  //       let a = responseObj.Title
  //       debugger
  //     }
  //   )
  // }

  render() {

    return (
      <View style={styles.container}>
        <SearchBar formSubmitted={this.formSubmitted} />
        <Text style={styles.heading}>Top Movies</Text>
        <TopMoviesList
          // moviesList = {JSON.stringify(search)}
          moviesList={this.addIndex(search.Search)}
          navigation = {this.props.navigation}
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