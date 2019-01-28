import React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';


export default class GroupCard extends React.Component {
    
    render() {

        const allUserNames = this.props.users.map((user) => {
            let keyGen = Math.floor(Math.random()*100);
            let userEmail ="";
            for(let userInList of this.props.userList){
                if(userInList.id === user){
                    userEmail = userInList.username
                }
            }
            return <View key={keyGen}><Text >{userEmail}   </Text></View>
        })
        console.log(styleCard.card)
        return (
            <View style={styleCard.card}>
                <Text>{this.props.name}</Text>
                <View style={styleCard.text}>{allUserNames}</View>
                {/* {allUserNames} */}
            </View>
        );
    }
}
const styleCard = StyleSheet.create({
    card: {
      borderWidth: 1,
      alignItems: 'center',
      marginBottom: 10,
      alignItems: 'flex-start',
      width: '100%'
    },
    text: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: "flex-start"
    }
  });