import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { View, FlatList, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ApolloClient from "apollo-boost"

const apolloClient = new ApolloClient({
    uri: "http://192.168.88.68:4000/graphql"
   });

export default class MapComponent extends Component {
    render() {
        // const allMarkers
        // apolloClient.query({

        //     query: gql`
        //       query users {

        //         users{
        //             username
        //             location{
        //                 lat
        //                 long
        //             }
        //         }
        //      }
        //     `,
            
        //   })
        //   .then(result => {console.log(result) })
        //   .catch(error => { console.log(error) });
        const query = gql`
        {
            group(id:3000){
                users{
                username
                location{
                    lat
                    long
                }
                }
            }
        }
        `;

      return (
    <Query query={query} >
    {({loading, error, data}) => {
         if(loading) return <Text>Loading Container...</Text>;
         if(error) return <Text>Group Component ERROR! {error}</Text>;
   
        // const user = data.group.users.map((user) => {
        //     console.log(user)
        // })
        return (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: 49.281372,
              longitude: -123.114542,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            showsUserLocation={true}
            followsUserLocation = {true}
          >
            <MapView.Marker
                  coordinate={{latitude: 49.28049066666667,
                  longitude: -123.11444733333333}}
                  title={"The Keg"}
                  description={"Steak"}
               />
          </MapView>

          )
        }
    }
    </Query>

      );
    }
  }