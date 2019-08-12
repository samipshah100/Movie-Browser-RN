import React from 'react'
import {TextInput,KeyboardAvoidingView, StyleSheet} from 'react-native'

const SearchBar = props => (
  <KeyboardAvoidingView style = {styles.inputContainer}>
    <TextInput 
      value = {props.searchQuery}
      style = {styles.input}
      onChangeText = {props.onChangeText}
      placeholder = "Search a movie ..."
    />
  </KeyboardAvoidingView>
)

const styles = StyleSheet.create(
  {
    input : {
      height:60,
      padding: 10,
      flex:1,
      fontSize: 22,
      backgroundColor: '#ffffff',
    },
    inputContainer: {
      height: 60,
      borderColor: 'grey',
      borderWidth: 0.3,
      borderStyle: "dotted",
      // flex:1,
      marginLeft: 10,
      marginRight: 10,
    },
  }
)
export default SearchBar


