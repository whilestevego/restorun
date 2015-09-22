import React from 'react';

export default class Restorun extends React.Component {
  static defaultProps = {
    initialZoom: 14,
    lat: 49.282225,
    lng: -123.122884
  }

  state = {
    window: {width: window.innerWidth, height: window.innerHeight}
  };

  mapCenterLatLng = () => {
    return new google.maps.LatLng(this.props.lat, this.props.lng);
  }

  placeMarker = (result) => {
    let options = {
      position: result.geometry.location,
      map: this.state.map
    }

    new google.maps.Marker(options);
  }

  searchLocation = (location) => {
    let request = {
      location: location,
      radius: '5000',
      types: ['restaurant']
    };

    let service = new google.maps.places.PlacesService(this.state.map);
    service.nearbySearch(request, this._handlePlacesSearch);
  };

  componentDidMount = () => {
    let initMapCenter = this.mapCenterLatLng();
    let mapOptions = {
      center: initMapCenter,
      zoom: this.props.initialZoom
    }

    this.state.map = new google.maps.Map(React.findDOMNode(this.refs.map), mapOptions);
    this.searchLocation(initMapCenter);

    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this._handleResize);
  };

  // EVENT HANDLERS
  _handlePlacesSearch = (results, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        let place = results[i];
        this.placeMarker(place);
      }
    }
  };

  _handleResize = (event) => {
    this.setState({window: {width: window.innerWidth, height: window.innerHeight}});
  };

  render () {
    return (
      <div
        ref="map"
        className='google-map'
        style={{
          height: this.state.window.height  + "px",
          width: this.state.window.width + "px"
        }}
        >
      </div>
    );
  }
};
