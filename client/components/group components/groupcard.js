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
            
            return <Text key={keyGen} style={{flexDirection: 'row'}} >{userEmail}</Text>
        })
        return (
            <View sytle={styles.container}>
                <Text>{this.props.name}</Text>
                {allUserNames}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      marginBottom: 5,
    },
  });