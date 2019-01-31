import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class Group extends Component {
 constructor(props) {
   super(props);
   this.state = {
     // loading: false,
     data: [],
     error: null,
   };
   this.arrayholder = [];
 }

 renderSeparator = () => {
   return (
     <View
       style={{
         height: 1,
         width: '86%',
         backgroundColor: '#CED0CE',
         marginLeft: '4%',
       }}
     />
   );
 };

 searchFilterFunction = text => {
   const newData = this.arrayholder.filter(item => {
     const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
     const textData = text.toUpperCase();
     return itemData.indexOf(textData) > -1;
   });
   this.setState({
     data: newData,
   });
 };

 renderHeader = () => {
   return (
     <SearchBar
       placeholder='Type Here...'
       lightTheme
       round
       onChangeText={text => this.searchFilterFunction(text)}
       autoCorrect={false}
     />
   );
 };

 onChatPress = () => {
   this.props.navigation.navigate('Chat');
 }

 render() {
  const userId = this.props.navigation.getParam('userID', 0);
   const query = gql`
   {
     user(id: ${userId}){
       email
       groups{
         Group_name
         users{
           username
         }
       }

     }
    }`

   // if (this.state.loading) {
   //   return (
   //     <View style={{ flex: 1, alignItems: ‘center’, justifyContent: ‘center’ }}>
   //       <ActivityIndicator />
   //     </View>
   //   );
   // }

   return (
     <Query query={query}>
     {({loading, error, data}) => {
       if(loading) return <Text>Loading Textlayers...</Text>;
       if(error) return <Text>PLAYER ERROR! {error}</Text>;

       return (
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={data.user}
          renderItem={({ groups }) => (
            <ListItem onPress={this.onChatPress}
              roundAvatar
              title={`${groups.Group_name}`}
              subtitle={groups.users[0].username}
              containerStyle={{ borderBottomWidth: 0 }}
              badge={{ value: 3, textStyle: { color: 'orange' }}}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
          
       );
     }}
   </Query>
   );
 }
}

export default Group;