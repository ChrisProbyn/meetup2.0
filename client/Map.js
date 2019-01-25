import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class Map extends Component {
    render() {
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
              coordinate={{latitude: 49.2834,
              longitude: -123.1164}}
              title={"The Keg"}
              description={"Steak"}
           />
      </MapView>
      );
    }
  }