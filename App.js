import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }
  
  componentDidMount() {
    return fetch('https://raw.githubusercontent.com/facebook/react-native-website/master/website/static/movies.json')
      .then ((response) => response.json())
      .then ((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        })
    })

      .catch((error) => {
      console.log(error)
    });
  }

  render() {

     if(this.state.isLoading) {

       return (
         <View style={styles.container}>
          <StatusBar style="dark" />
          <ActivityIndicator />
         </View>
       )
     } else {

      let movies = this.state.dataSource.map((val, key) => {
        return <View key={key} style={styles.item}>
                <Text style={{fontSize: 25}}>{val.title}, {val.releaseYear}</Text>
                </View>
      });

        return (
          <View style={styles.container}>
            <StatusBar style="dark" />
            {movies}
          </View>
          );
        }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
})

