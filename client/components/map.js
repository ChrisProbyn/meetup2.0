import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Polyline, ProviderPropType} from 'react-native-maps';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import mapStyle from "./mapstyle.js"



const flagImage = require('../assets/flag-icon.png')

export default class Map extends Component {
    constructor(props){
        super(props);
        this.state ={ havePlaces: false}
    }

    componentDidMount(){
        return fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2790,-123.1187&radius=150&type=restaurant&key=AIzaSyCA6u5xPFKnTN-iyVtUYWsdR9xWOMec14M')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
                havePlaces: true,
                dataSource: responseJson.results,
              });
          })
          .catch((error) =>{
            console.error(error);
          });
      }

    randomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    renderPlacesMarker() {
        if(this.state.havePlaces){
           return this.state.dataSource.map((place) => {
                return <MapView.Marker
                key={place.id} 
                coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng}}
                title={place.name}
                image={place.icon}
                pinColor={"red"}
                description={`rating: ${place.rating}/5, types: ${place.types[0]}`}
                />
            })
        }
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

        coordArray = (array) => {
            const array2 = array.map((user) => {
                return {latitude: user.location.lat, longitude: user.location.long}
            })
            let arrayItemOne = array2[0];
            array2.push(arrayItemOne);
            return array2;
        }

      return (
    <Query query={query}>
    {({loading, error, data}) => {
        if(loading) return <Text>Loading Container...</Text>;
        if(error) return <Text>Group Component ERROR! {error}</Text>;

        const positions = data.group.users.map((user) => {
          return {latitude: user.location.lat, longitude: user.location.long}
        })
        centroid = Center(positions);
        console.log(centroid)
        
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
            coordinates={coordArray(data.group.users)}
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
            {this.renderPlacesMarker()}
          </MapView>
          )
        }
    }
    </Query>
      );
    }
  }