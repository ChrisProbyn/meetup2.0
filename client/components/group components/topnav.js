import React, {Component} from 'react';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { StyleSheet} from 'react-native';

export default class TopNav extends Component {
    render() {
        return (
            <NavBar style={styles}
              statusBar={{ barStyle: 'light-content' }}
            >
              <NavButton>
                <NavButtonText style={styles.buttonText}>
                  {"Button"}
                </NavButtonText>
              </NavButton>
              <NavTitle style={styles.title}>
                {"App"}
              </NavTitle>
              <NavButton>
                <NavButtonText style={styles.buttonText}>
                  {"Button"}
                </NavButtonText>
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
  })