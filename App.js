import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, } from 'react-native';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      title: '',
      description: '',
    }
  }

  
  componentDidMount() {
    return fetch('https://raw.githubusercontent.com/facebook/react-native-website/master/website/static/movies.json')
      .then ((response) => response.json())
      .then ((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
          title: responseJson.title,
          description: responseJson.description
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
              <Text style={{fontSize: 20}}>{val.title}, {val.releaseYear}</Text>
             </View>
      });

    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{this.state.title}</Text>
        <Text  style={{
          color:'#eee',
          marginTop: 5
          }}>{this.state.description}</Text>
        </View>
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
  },
  viewStyle: {
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: width,
    paddingTop: 20,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    elevation: 2,
    position: 'relative',
    
  },
  textStyle: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#eee'
    
  }
})

