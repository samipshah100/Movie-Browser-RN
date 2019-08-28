import React from 'react'
// import { Image, Text, View, StyleSheet } from 'react-native'
import { Image,View,  StyleSheet } from 'react-native'
import {search, movie } from '../mockData'
import {API_KEY} from '../ApiKey'
import { Container, Spinner,H1, H2, H3, Header, Content, Card, Right, Title, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class MovieDetailsScreen extends React.Component {
  state = {
    isLoading: true,
    imdbID: this.props.navigation.getParam('imdbID')
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Movie Details", 
    }
  }

  componentDidMount () {
    fetch(`http://www.omdbapi.com/?i=${this.state.imdbID}&apikey=${API_KEY}`)
    .then(
      response => response.json()
    )
    .then(
      responseObj => {
        // debugger
        this.setState({
          Title: responseObj.Title,
          Year: responseObj.Year,
          Released: responseObj.Released,
          Runtime: responseObj.Runtime,
          Genre: responseObj.Genre,
          Director: responseObj.Director,
          Writer: responseObj.Writer,
          Actors: responseObj.Actors,
          Plot: responseObj.Plot,
          Language: responseObj.Language,
          Country: responseObj.Country,
          Poster: responseObj.Poster,
          isLoading: false,
        })
      }
    )
    /*
    {
      "Title": "Star Wars: Episode I - The Phantom Menace",
      "Year": "1999",
      "Rated": "PG",
      "Released": "19 May 1999",
      "Runtime": "136 min",
      "Genre": "Action, Adventure, Fantasy, Sci-Fi",
      "Director": "George Lucas",
      "Writer": "George Lucas",
      "Actors": "Liam Neeson, Ewan McGregor, Natalie Portman, Jake Lloyd",
      "Plot": "Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their old glory.",
      "Language": "English",
      "Country": "USA",
      "Awards": "Nominated for 3 Oscars. Another 26 wins & 65 nominations.",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
      "Ratings": [{
        "Source": "Internet Movie Database",
        "Value": "6.5/10"
      }, {
        "Source": "Rotten Tomatoes",
        "Value": "54%"
      }, {
        "Source": "Metacritic",
        "Value": "51/100"
      }],
      "Metascore": "51",
      "imdbRating": "6.5",
      "imdbVotes": "658,734",
      "imdbID": "tt0120915",
      "Type": "movie",
      "DVD": "16 Oct 2001",
      "BoxOffice": "$431,000,000",
      "Production": "20th Century Fox",
      "Website": "http://www.starwars.com/episode-i/",
      "Response": "True"
    }
    */
  }
  
  render() {
    // {this.state.isLoading ?  return(<Spinner />) :
    if (this.state.isLoading) {
      return <Spinner/>
    }
    else {
      return (
        <Container>
          <Content>
            <Card style={{flex: 0}}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: this.state.Poster}} />
                  <Body>
                    <Text>{this.state.Title}</Text>
                    <Text note>Release Date: {this.state.Released}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{uri: this.state.Poster}} style={{height: 200, width: 200, flex: 1}}/>
                  <H2 style = {{marginTop:20,}}>Director: {this.state.Director}</H2>
                  <H3 style = {{marginTop:10,}}>Actors: {this.state.Actors}</H3>
                  <H3 style = {{marginTop:10,}}>Runtime: {this.state.Runtime}</H3>
                  <Text style = {{marginTop:20,}}>
                    {this.state.Plot} 
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      )
    }
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