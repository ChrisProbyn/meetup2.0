import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import { Text, Button, Alert,TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import mapStyle from "./mapstyle.js"
import apikey from "./apikey.js"


const flagImage = require('../assets/flag-icon.png')
const resImage = require('../assets/res-icon.png')

export default class Map extends Component {
    constructor(props){
        super(props);
        this.state ={ 
            havePlaces: false,
            default: true,
            random: false,
            filteredMarker: false,
            filter: ""
        }
    }
    static navigationOptions = () => {
        return {
            title: 'Map',
            headerRight: (
            <Button
                onPress={() => {
                Alert.alert('Poll Button Clicked');
                }}
                title="Poll"
                color="green"
            />
            ),
        }
    };

    componentDidMount(){
        return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2790,-123.1187&radius=150&type=restaurant&key=${apikey}`)
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
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';;
    }

    renderPlacesMarker() {
        if(this.state.havePlaces&& this.state.default){
           return this.state.dataSource.map((place) => {
                return <MapView.Marker
                key={place.id} 
                coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng}}
                title={place.name}
                image={resImage}
                description={`rating: ${place.rating}/5, types: ${place.types[0]}`}
                />
            })
        }
    }
    renderRandomMarker() {
        
        if(this.state.havePlaces && this.state.random){
            let highRated =  this.state.dataSource.filter(place => place.rating > 4).map((place) => {
                return <MapView.Marker
                            key={place.id} 
                            coordinate={{
                                latitude: place.geometry.location.lat,
                                longitude: place.geometry.location.lng}}
                            title={place.name}
                            image={resImage}
                            description={`rating: ${place.rating}/5, types: ${place.types[0]}`}
                            />
            })
            let randomNumber = Math.floor(Math.random()*10)
            return highRated[randomNumber];
        }
    }
    renderFilteredMarker() {
        const filter = this.state.filter
        if(this.state.filteredMarker && this.state.havePlaces && filter){
            return this.state.dataSource.filter(place => place.types.includes(filter)).map((place) => {
                return <MapView.Marker
                            key={place.id} 
                            coordinate={{
                                latitude: place.geometry.location.lat,
                                longitude: place.geometry.location.lng}}
                            title={place.name}
                            image={resImage}
                            description={`rating: ${place.rating}/5, types: ${place.types[0]}`}
                            />
            })
        }
    }
    randomClick = () => {
        //function to handle click on floating Action Button
        this.setState({random: true, default:false});
      };
    filterClick = () => {
        //function to handle click on floating Action Button
        this.setState({filteredMarker: true, default:false, filter: "cafe"});
      };
    

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
        
        return (
            <>
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
            {/* <MapView.Marker 
                coordinate={centroid}
                title={"center"}
                image={flagImage}
                /> */}
            {this.renderFilteredMarker()}
            {this.renderPlacesMarker()}
            {this.renderRandomMarker()}
          </MapView>
                <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.randomClick}
                style={styles.TouchableOpacityStyle1}>
          <Image
            source={require('../assets/add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
                activeOpacity={0.7}
                onPress={ this.filterClick}
                style={styles.TouchableOpacityStyle2}>
          <Image
            source={require('../assets/add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>

        </>
          )
        }
    }
    </Query>
      );
    }
  }


  const styles = StyleSheet.create({
 
    TouchableOpacityStyle1: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 15,
      top: 30,
    },
    TouchableOpacityStyle2: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 15,
        top: 30,
      },
   
    FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
    },
  });