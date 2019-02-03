import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Polyline, ProviderPropType} from 'react-native-maps';
import {   StyleSheet, View, Text, Dimensions, TouchableOpacity, } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import mapStyle from "./mapstyle.js"


const flagImage = require('../assets/flag-icon.png')

export default class Map extends Component {
    constructor(props){
        super(props);
    }

    randomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    render() {
        const query = gql`
        {
            group(id:3000){
                Group_name
                users {
                  id
                  username
                  location {
                      lat
                      long
                  }
                }
            }
        }
        `;
        Center = (points) => {
          var l = points.length;
        
          return points.reduce(function(center, p, i) {
            center.latitude += p.latitude;
            center.longitude += p.longitude;
        
            if(i === l - 1) {
                center.latitude /= l;
                center.longitude /= l;
            }
        
            return center;
          }, {latitude: 0, longitude: 0});
        };

      return (
    <Query query={query}>
    {({loading, error, data}) => {
        if(loading) return <Text>Loading Container...</Text>;
        if(error) return <Text>Group Component ERROR! {error}</Text>;

        const positions = data.group.users.map((user) => {
          return {latitude: user.location.lat, longitude: user.location.long}
        })
        centroid = Center(positions);
        return (
          <MapView
            customMapStyle={mapStyle}
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

<Polyline
        coordinates={[
            { latitude: 49.2813, longitude: -123.1145 },
            { latitude: 49.2844, longitude: -123.1089 },
            { latitude: 49.2757, longitude: -123.1199 },
            { latitude: 49.2813, longitude: -123.1145 },
        ]}
        strokeColor="rebeccapurple"
        strokeWidth={6}
    />

            {data.group.users.map(marker => (
                <MapView.Marker 
                coordinate={{
                    latitude: marker.location.lat,
                    longitude: marker.location.long
                }}
                title={marker.username}
                key={marker.id}
                pinColor={this.randomColor()}
                />
            ))}
            <MapView.Marker 
                coordinate={centroid}
                title={"center"}
                image={flagImage}
                />
          </MapView>
          )
        }
    }
    </Query>
      );
    }
  }