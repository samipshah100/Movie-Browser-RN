import React from 'react'
import {FlatList,TouchableOpacity,Image, View, Text, StyleSheet} from 'react-native'
import {MovieDetailsScreen} from './screens/MovieDetailsScreen'


export default class TopMoviesList extends React.Component {
  
  state = {}

  showMovieDetails = (imdbID) => {
    
    this.props.navigation.navigate("MovieDetails", {imdbID: imdbID})
  }
  
  renderItem = (obj) => (
    // <TouchableOpacity onPress = {this.props.navigate.navigate("MovieDetails", {imdbID: obj.item.imdbID})}>
    <TouchableOpacity onPress = {() =>(this.showMovieDetails( obj.item.imdbID))}>
      <View style = {styles.row}>
        <Image
            style={{width: 120, height: 120}}
            source={{uri: obj.item.Poster}}
        />
        <View style = {styles.textBox}>
          <View style = {{flexDirection:"row"}}>
            <Text style={styles.titleText}>{obj.item.Title}</Text>
          </View>
          <View style = {{marginTop:10, flex:1, flexDirection:"row", }}>
            <Text style = {{fontWeight: "bold", fontSize:16,}}>Year: </Text><Text style = {{fontSize:16,}}>{obj.item.Year}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  render () {
    return (
    <FlatList style = {styles.container}
      renderItem = {this.renderItem}
      data = {this.props.moviesList}
      onEndReached = {this.props.onEndReached}
      keyExtractor = {(item, index) => item.i}
    />
    )
  }
}
const styles = StyleSheet.create(
  {
    container:  {
      marginTop:10,
      flex:1,
    },
    row: {
      borderColor: '#DCDCDC',
      borderWidth: 1,
      marginLeft:10,
      marginRight:10,
      padding:10,
      flex:1,
      flexDirection: "row",
    },
    textBox:  {
      flexDirection:'column',
      marginLeft:15,
      // flexWrap:"wrap",
      flex:1

    },
    titleText:  {
      fontWeight:"bold",
      fontSize:20,
      flex:1,
      flexWrap:"wrap",
    }
  }
)
// export default TopMoviesList


