import React, {Component} from 'react';
import { View, FlatList, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class Map extends Component {
    constructor(props){
        super(props);
    }

    mapStyle = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "labels",
          "stylers": [
            {
              "color": "#ffb316"
            },
            {
              "weight": 0.5
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#263c3f"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6b9a76"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        }
      ]

    randomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    render() {
        // const allMarkers
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

      return (
    <Query query={query}>
    {({loading, error, data}) => {
        if(loading) return <Text>Loading Container...</Text>;
        if(error) return <Text>Group Component ERROR! {error}</Text>;
        console.log(data.group.users[0].location.long)
        return (
          <MapView
            customMapStyle={this.mapStyle}
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
          </MapView>
          )
        }
    }
    </Query>
      );
    }
  }