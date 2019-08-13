import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { search, movie } from '../mockData'
import SearchBar from '../SearchBar'
import TopMoviesList from '../TopMoviesList'
import SearchResultsScreen from './SearchResultsScreen';

const API_KEY = "6d83215a"
var totalResultPages = 0
var data = "failed"
var testArr = []

export default class HomeScreen extends React.Component {
  state = {
    search: search,
    dataString: "",
    searchError: false,
  }

  static navigationOptions = {
    headerTitle: "Browse Movies",
    headerTintColor: "dodgerblue",
  }

  // SearchBar submissions will be processed here. 

  formSubmitted = (text) => {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${text.trim()}`)
      .then(
        response => {
          // response.status is "200" if API successful. EVEN IF movie is NOT found. 
          return response.json()
        }
      )
      .then(
        (jsonResponse) => {
          //jsonResponse is a JSON object with the following keys:
          /* 
          - Response: "True" or "False" string based on if movie found
          - Search: Object array with the 10 results
          - totalResults: "43" string with number of total movies found. 
          */

          let jsonParamObject = {
            isMovieFound: jsonResponse.Response,
            searchResults: jsonResponse.Search,
            totalResults: jsonResponse.totalResults,
            searchString: text.trim(),
            jsonResponse,
          }

          // We will pass the search object array and other JSON objects containing search data and metadata to SearchResultsScreen

          // if more than 10 movies we need to display all results. For this we will:
          /*
          - create an empty arry with [1...number of pages]
          - map over that array to get the Search results of every page. This will be returned to us as `response.json().Search`
          - now we have an object array with objects containing all titles.
          - we pass this object array to flatlist and voila!
          */

          // 10 results per page provided by OMDBI
          totalResultPages = Math.ceil(jsonResponse.totalResults / 10)

          let resultsArray = [...Array(totalResultPages).keys()]

          let finalArray = resultsArray.map((i) => {
            fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${text.trim()}&page=${i + 1}`)
              .then(
                (response) => (response.json())
              )
              .then((jsonResponse1) => {
                testArr[i] = jsonResponse1.Search
                console.log("test array no" + i + " " + testArr[i].toString())
                debugger
                return (jsonResponse1.Search)
              }
              )
          })
          


          console.log("Final Array Finally" + finalArray.toString())

          debugger
          //this.props.navigation.navigate('SearchResults', jsonParamObject)


          // if(jsonResponse.ok) {
          //   this.setState({
          //     dataString: `Error found: ${jsonResponse.Error}. Please go back and search again.`,
          //     searchError:true,
          //   })
          // }
          // else  {
          //   this.setState({
          //     dataString: JSON.stringify(jsonResponse),
          //     searchError:false,
          //   })
          // }
          // debugger
          // return jsonResponse
        }
      )
  }

  render() {

    return (
      <View style={styles.container}>
        <SearchBar formSubmitted={this.formSubmitted} />
        <Text style={styles.heading}>Top Movies</Text>
        <TopMoviesList
          // moviesList = {JSON.stringify(search)}
          moviesList={search.Search}
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