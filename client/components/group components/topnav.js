import React, {Component} from 'react';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

export default class TopNav extends Component {
    render() {
        return (
          <NavBar>
            <NavButton onPress={() => alert('sup')}>
              <NavButtonText>
                {"Button"}
              </NavButtonText>
            </NavButton>
            <NavTitle>
              {"App"}
            </NavTitle>
            <NavButton onPress={() => alert('not much')}>
              <NavButtonText>
                {"Button"}
              </NavButtonText>
            </NavButton>
          </NavBar>
        )
      }
}