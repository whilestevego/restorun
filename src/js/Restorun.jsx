import React from 'react';
import { GoogleMap, Marker } from 'react-google-maps';

export default class Restorun extends React.Component {
  state = {
    center: {lat: 49.282225, lng: -123.122884}
  };

  render () {
    return (
      <GoogleMap
        containerProps={{
          ...this.props,
          style: {
            height: "500px",
            width: "500px"
          },
        }}
        ref="map"
        defaultZoom={14}
        defaultCenter={this.state.center}
      >
      </GoogleMap>
    );
  }
}
