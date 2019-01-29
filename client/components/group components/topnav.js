import React, {Component} from 'react';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { StyleSheet, Image} from 'react-native';

export default class TopNav extends Component {
  constructor(props) {
    super(props)
  }

    render() {

     
        return (
            <NavBar style={styles}
              statusBar={{ barStyle: 'light-content' }}
            >
              <NavButton onPress={()=> {this.props.back(true)}}>
              <Image style={styles.image}
                resizeMode={"contain"}
                source={require("../../assets/back-icon.png")}
              />
              </NavButton>
              <NavTitle style={styles.title}>
                {"App"}
              </NavTitle>
              <NavButton onPress={()=> {this.props.add(true)}} >
              <Image style={styles.image}
                resizeMode={"contain"}
                source={require("../../assets/add-icon.png")}
              />
              </NavButton>
            </NavBar>
          )
    }
}

const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: '#000',
      paddingTop: 50,
    },
    navBar: {
      backgroundColor: '#212121',
    },
    title: {
      color: '#fff',
    },
    buttonText: {
      color: '#b5b5b5',
    },
    image: {
      width: 30,
    },
  })