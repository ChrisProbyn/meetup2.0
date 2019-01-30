import React, { Component } from 'react';
import { ImageBackground, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Query } from "react-apollo";
import gql from "graphql-tag";

class Main extends Component {
    state = {
      backgroundImage: require("../assets/background.png")
  }

  onPress = () => {
      this.props.navigation.navigate('Landing');
  }

  render() {
    const query = gql
    `{
      user(id:6000){
        username
      }
     }`
    return (
      <Query query={query}>
       {({loading, error, data}) => {
         if(loading) return <Text>Loading Textlayers...</Text>;
         if(error) return <Text>PLAYER ERROR! {error}</Text>;

         return (
           <React.Fragment>
             <Text>
              {data.user.username}
             </Text>
           </React.Fragment>
         );
       }}
     </Query>
      // <ImageBackground source={this.state.backgroundImage} style={styles.container}>
      //   <TouchableOpacity onPress={this.onPress}>
      //     <Text style={styles.text}>MeetUp</Text>
      //   </TouchableOpacity>
      // </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  text: {
      textAlign: 'center',
      fontSize: 45,
      color: 'white',
      marginBottom: 30,
      width: "90%"
  },
});
export default Main;