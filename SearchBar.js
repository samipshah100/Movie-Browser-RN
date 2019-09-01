import React from 'react'

import { TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native'

import { connect } from 'react-redux';

import { saveSearchString } from './redux/actions';


// returns a search string to HomeScreen. Input is NOT sanitized because of using OMDB API.

class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchText: "",
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ searchText: text, })}
          value={this.state.searchText}
          placeholder="Search a movie ..."
          onSubmitEditing={() => {
            this.props.saveSearchString(this.state.searchText.trim())
            this.props.searchBarUpdated()
          }}
          // onSubmitEditing={event => {
          //   this.props.saveSearchString(event.nativeEvent.text.trim())
          //   this.props.searchBarUpdated()
          // }}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create(
  {
    input: {
      height: 60,
      padding: 10,
      flex: 1,
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

export default connect(null, { saveSearchString })(SearchBar)


