import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import { Text, Button, TouchableOpacity, StyleSheet, Image, Modal, View, Alert} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import mapStyle from "./mapstyle.js"
import apikey from "./apikey.js"
import t from 'tcomb-form-native';


// const flagImage = require('../assets/flag-icon.png')
const resImage = require('../assets/res-icon.png')
const Form = t.form.Form;
const filter = t.struct({
  FoodOrNightlife: t.Boolean
});
  
  const formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {
        marginBottom: 10,
        color: 'white'
      },
    },
    textbox: {
      normal: {
      color: "white",
        fontSize: 15,
      height: 36,
      paddingHorizontal: 7,
      borderRadius: 4,
      borderColor: "white",
      borderWidth: 1,
      marginBottom: 5,
      fontWeight: '600'
      },
      error: {
        color: "white",
        fontSize: 15,
      height: 36,
      paddingHorizontal: 7,
      borderRadius: 4,
      borderColor: "red",
      borderWidth: 1,
      marginBottom: 5,
      fontWeight: '600'
      }
    },
    controlLabel: {
      normal: {
        color: 'white',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      },
      // the style applied when a validation error occours
      error: {
        color: 'red',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      },
    }
  }
  
  const options = {
    fields: {
   
      FoodOrNightlife: {
      
      },
    },
    stylesheet: formStyles,
  };

export default class Map extends Component {
    constructor(props){
        super(props);
        this.state ={ 
            havePlaces: false,
            default: true,
            random: false,
            filteredMarker: false,
            keyword: "",
            type: "restaurant",
            centroid: {latitude: 0, longitude: 0},
            modalVisible: false,
        }
    }
    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: {backgroundColor: "#29293d"},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            title: 'Map',
            headerRight: (
            <Button
                onPress={navigation.getParam('renderFilter') }
                title="Filter"
                color="gold"
            />
            ),
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({ renderFilter: this._renderfilter });
    }

    randomColor() {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    }

    _renderfilter = () => {
        this.setState({modalVisible: true });
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
            let randomNumber = Math.floor(Math.random() * highRated.length)
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
        this.setState({random: true, default:false});
    };

    centerClick = (center, type) => {
        if(!type){
        return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.latitude},${center.longitude}&radius=150&type=restaurant&key=${apikey}`)
            .then((response) => response.json())
            .then((responseJson) => {
            this.setState({
                havePlaces: true,
                random: false,
                default: true,
                dataSource: responseJson.results,
                });
            })
            .catch((error) =>{
            console.error(error);
            });
        } else {
            console.log(type)
             return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.latitude},${center.longitude}&radius=300&type=night_club&key=${apikey}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            this.setState({
                havePlaces: true,
                random: false,
                default: true,
                modalVisible: false,
                dataSource: responseJson.results,
                });

            })
            .catch((error) =>{
            console.error(error);
            });
        }
    };
    
    render() {
        const groupID = this.props.navigation.getParam('groupID');
        const query = gql`
        {
            group(id: ${groupID}){
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

            {data.group.users.filter(user => user.location.lat != 49.281372).map(marker => (
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
            source={require('../assets/shuffle-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.centerClick(centroid, this.state.type, this.state.keyword)}
                style={styles.TouchableOpacityStyle2}>
          <Image
            source={require('../assets/flag-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          presentationStyle={"overFullScreen"}
          >
          
            <View style={styles.Modalcontainer}>
            <Form 
                ref={c => this._form = c}
                type={filter} 
                options={options}
                style={{color: 'white'}}
            />
              <TouchableOpacity >
                <Button title="Refine"
                  onPress={() => this.centerClick(centroid,this._form.getValue().FoodOrNightlife)}/>
              </TouchableOpacity>
              <TouchableOpacity >
                <Button title="Dismiss"
                  color='#ffd700'
                  onPress={() => this.setState({modalVisible: false})}/>
              </TouchableOpacity>
            </View>

        </Modal>

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
    Modalcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#3d3d5c"
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