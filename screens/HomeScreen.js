import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { search, movie } from '../mockData'
import SearchBar from '../SearchBar'
import TopMoviesList from '../TopMoviesList'
import SearchResultsScreen from './SearchResultsScreen'
import { API_KEY } from '../ApiKey'

import { fetchTopMovies } from '../redux/actions'

import { connect } from 'react-redux'

const harryPotter = 'harry+potter'

var data = "failed"
var i = 1

class HomeScreen extends React.Component {
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

  componentDidMount() {
    this.props.fetchTopMovies(harryPotter)
  }

  searchBarUpdated = () => {
    this.props.navigation.navigate('SearchResults')
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
        <SearchBar searchBarUpdated={this.searchBarUpdated} />
        <Text style={styles.heading}>Top Movies</Text>
        <TopMoviesList
          moviesList={this.props.homeMoviesList}
          navigation={this.props.navigation}
          endReached={true}
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

const mapStateToProps = state => ({
  homeMoviesList: state.home.homeMoviesList,
})

// const mapDispatchToProps = state => ({
//   fetchTopMovies: fetchTopMovies

// })

export default connect(mapStateToProps, { fetchTopMovies })(HomeScreen)
