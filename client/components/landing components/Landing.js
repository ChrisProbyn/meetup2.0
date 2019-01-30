import React, {Component} from 'react';
import {StyleSheet, View, Text,  TouchableOpacity, ImageBackground} from 'react-native';
import Login from "./Login.js";



export default class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewSection :true,
        }
    }
    renderBottomComponent() {
        if(this.state.viewSection) {
          return (
            <Login style={styleschat.form} users={this.props.users} changeUser={this.props.changeUser} addUser={this.props.addUser}/>
          )
        }
      }
    buttonPressLanding=()=>{
        this.setState({viewSection:true})
    }
    render() {
        return (
            <React.Fragment>
                <ImageBackground source={this.props.background} style={styleschat.container}>
                    <TouchableOpacity onPress={this.buttonPressLanding}>
                    <Text style={styleschat.text}>MeetUp</Text>
                    </TouchableOpacity>
                    {this.renderBottomComponent()}
                </ImageBackground>
                
            </React.Fragment>
      );
    }
  }
  const styleschat = StyleSheet.create({
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