import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Map from './Map.js';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      viewSection :false
    }
  }

  renderBottomComponent() {
    if(this.state.viewSection) {
      return (
      <Map />
      )
    }
  }

buttonPress=()=>{
    this.setState({viewSection:true})
}

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
      <TouchableOpacity onPress={this.buttonPress}>
          <Text> Click Me!</Text>
      </TouchableOpacity>
      </View>

      {this.renderBottomComponent()}

    </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
