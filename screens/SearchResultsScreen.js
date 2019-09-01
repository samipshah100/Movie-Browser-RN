import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { API_KEY } from '../ApiKey'
import TopMoviesList from '../TopMoviesList'

import { searchResultsList, emptyMoviesList } from '../redux/actions'

import { connect } from 'react-redux'

import { HeaderBackButton } from 'react-navigation';

var totalResultPages = 0
var searchResultsArr = []
var flatListArr = []
var i = 1
var totalResultsSet = false
var totalPages = 0

class SearchResultsScreen extends React.Component {
  state = {
    isLoading: true,
    searchString: this.props.q,
    moviesListArr: [],
    // totalPages: 0,
    pageNumberToDisplay: 0,
    pageToLoadNext: 0,
    endReached: false,

  }

  static navigationOptions = ({navigation}) => {
    // const {state} = navigation
    return {
      headerTitle: "Search Results",
      // headerMode: null,
      headerLeft: <HeaderBackButton onPress={() => {
      navigation.state.params.emptyMoviesListParam()
      navigation.goBack(null)
      } 
      }/>,
    }
  }
  
  async componentDidMount() {
    // handle back button with redux
    this.props.navigation.setParams({
      emptyMoviesListParam: this.props.emptyMoviesList, 
    })

    this.setState({
      searchString: this.props.q,
    })
    if (totalResultsSet === false) {
      await this.getTotalPages()
      totalResultsSet = true
    }
    this.displayNextPage()
  }

  getTotalPages = async () => {
    try {
      await fetch(`http://www.omdbapi.com/?s=${this.state.searchString}&apikey=${API_KEY}&page=1`)
        .then(
          response => response.json()
        )
        .then(
          response => {
            if (response.totalResults){
              totalPages = parseInt(response.totalResults)
              return
            }
            else{
              // no results found. handle this case.
              this.handleNoResultsFound()
            }
          }
        )
      // await this.props.searchResultsList(this.state.searchString, 1, true)
    } catch (err) {
      // will go here only in case of network error
      console.log(err.message);
    }
  }

  displayNextPage = () => {
    console.log("pagetoload: ", this.state.pageToLoadNext)
    console.log("totalResults: ", totalPages)
    // debugger
    if (this.state.pageToLoadNext < totalPages) {
      this.setState(
        (prevState) => ({
          pageToLoadNext: prevState.pageToLoadNext + 1,
        }),
        () => this.props.searchResultsList(this.state.searchString, this.state.pageToLoadNext)
      )
    }
    else {
      this.setState({ endReached: true, })
    }
  }

  handleNoResultsFound = () => {
    console.log("Sorry no results found");
    Promise.resolve(null)
    this.props.navigation.navigate('Error', {q: this.state.searchString})
    // debugger
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Showing results for: "{this.state.searchString}"</Text>
        <TopMoviesList
          // moviesList={this.state.moviesListArr}
          moviesList={this.props.searchMoviesList}
          onEndReached={this.displayNextPage}
          navigation={this.props.navigation}
        // showMovieDetails = {this.showMovieDetails('tt0120915')}

        //moviesList takes an OBJECT ARRAY ^
        // moviesList={[{ "Title": "Star Wars: Episode IV - A New Hope", "Year": "1977", "imdbID": "tt0076759", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" }]}
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

const mapStateToProps = state => ({
  searchMoviesList: state.searchResults.searchMoviesList,
  totalResults: state.searchResults.totalResults,
  q: state.searchResults.q,
})

export default connect(mapStateToProps, { emptyMoviesList,searchResultsList })(SearchResultsScreen)



///////////////////////////
///////////////////////////
/// -------------------///
//// USED BEFORE REDUX ////
/// ------------------///
//////////////////////////
//////////////////////////



// addIndex = (searchArr) => {
//   var searchWithIndex = searchArr.map(
//     (obj) => {
//       let rObj = { i: i.toString(), ...obj }
//       i++
//       return rObj
//     }
//   )
//   return searchWithIndex
// }

// // SearchBar submissions will be processed here. 

// handlePageDisplay = (pageNum) => {
//   // if (this.state.pageNumberToDisplay <= totalResultPages) {
//   if (pageNum <= totalResultPages) {
//     //display next page

//     fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.searchString}&page=${this.state.pageNumberToDisplay}`)
//       .then(
//         response => response.json()
//       )
//       .then(
//         responseObj => {
//           currentPageResults = this.addIndex(responseObj.Search)
//           //responseObj is a JSON object with the following keys:
//           /* 
//           - Response: "True" or "False" string based on if movie found
//           - Search: Object array with the 10 results
//           - totalResults: "43" string with number of total movies found. 
//           */
//           this.setState(
//             {
//               moviesListArr: [...this.state.moviesListArr, ...currentPageResults],
//             }
//           )
//           // console.log("listed. pno ", this.state.pageNumberToDisplay)

//         }
//       )
//       .catch((error) => {
//         // console.log("Sorry something went wrong. Make sure you are connected to the internet and try again. Error details: ", error)
//         this.setState({
//           moviesListArr: [{ "Title": "Sorry something went wrong. Make sure you are connected to the internet and try again" }]
//         })
//       })
//   }


// }

// componentDidMount() {
  //   // this.fetchSearchResults(this.state.searchString)
  //   fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.searchString}&page=${1}`)
  //     .then(
  //       response => response.json()
  //     )
  //     .then(
  //       responseObj => {
  //         totalResultPages = Math.ceil(parseInt(responseObj.totalResults) / 10)
  //         this.setState({
  //           totalPages: totalResultPages,
  //         })
  //         if (responseObj.Response === 'True') {
  //           this.handleScrolling()
  //         }
  //         else if (responseObj.Response === 'False') {
  //           console.log("No matches found for your search result. Please try again.")
  //           this.setState({
  //             moviesListArr: [{ "Title": "No matches found for your search result. Please try again." }]
  //           })
  //         }
  //       }
  //     )
  //     // .then(

  //     // )
  //     .catch((error) => {
  //       console.log("Sorry something went wrong. Make sure you are connected to the internet and try again. Error details: ", error)
  //       this.setState({
  //         moviesListArr: [{ "Title": "Sorry something went wrong. Make sure you are connected to the internet and try again" }]
  //       })
  //     })
  // }

// handleScrolling = () => {
//   // debugger
//   this.setState(
//     (prevState) => ({
//       pageNumberToDisplay: prevState.pageNumberToDisplay + 1,
//     }),
//     () => this.handlePageDisplay(this.state.pageNumberToDisplay)
//   )

//   // console.log("page end reached. pno ",this.state.pageNumberToDisplay)
//   // this.handlePageDisplay()
// }

// // showMovieDetails = (id) => {
// //   fetch(`http://www.omdbapi.com/?i=${tt0120915}&apikey={API_KEY}}`)
// //   .then(
// //     response => response.json()
// //   )
// //   .then(
// //     responseObj => {
// //       let a = responseObj.Title
// //       debugger
// //     }
// //   )
// // }


/// NOT USED ASYNC FUNCTION

// fetchSearchResults = (q) => {
//   // this for loop creates an array of 10 elements, each element respresents a page of search result. each page itself ( i.e searchResultsArr[i]) is an array , containing 10 elements each, each element respesenting a search result.

//   const calcPages = async () => {
//     let response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&page=${1}`)
//     let responseObj = await response.json()
//     //responseObj is a JSON object with the following keys:
//     /* 
//     - Response: "True" or "False" string based on if movie found
//     - Search: Object array with the 10 results
//     - totalResults: "43" string with number of total movies found. 
//   */
//     let total = await responseObj.totalResults
//     totalResultPages = await Math.ceil(parseInt(total) / 10)
//     console.log("total in calcpages", totalResultPages)
//     return totalResultPages
//     // debugger
//   }
//   calcPages().then(
//     async (totalResultPages) => {
//       for (let i = 0; i < totalResultPages; i++) {
//         let response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&page=${i + 1}`)
//         // fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&page=${1}`)

//         let responseObj = await response.json()

//         searchResultsArr[i] = await responseObj.Search

//         // now search results contains 10 pages: 1 in each index. searchResultsArr[i] contains: 1 page of results saved as an array with 10 indices, each indice is a result.
//         await console.log(responseObj.Search)
//       }
//     }
//   )
//     .then(
//       () => {
//         console.log("now i am going to asyncListReady", totalResultPages)
//         flatListArr = searchResultsArr.reduce((acc, curr) => (acc.concat(curr)))
//         this.setState({ moviesListArr: flatListArr })
//       }
//     )
// }