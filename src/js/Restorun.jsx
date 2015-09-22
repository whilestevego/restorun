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
    //TODO: Don't place marker if there is one already there
    let options = {
      position: result.geometry.location,
      map: this.state.map,
      icon: {
        url: this.getIconUrl(),
        anchor: new google.maps.Point(10, 10),
        scaledSize: new google.maps.Size(10, 10)
      }
    }

    new google.maps.Marker(options);
  }


  getIconUrl = () => {
    let rand = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; }

    return `https://cdnjs.cloudflare.com/ajax/libs/emojione/1.5.0/assets/svg/1F35${rand(1,9)}.svg`
  }

  componentDidMount = () => {
    let initMapCenter = this.mapCenterLatLng();
    let mapOptions = {
      center: initMapCenter,
      zoom: this.props.initialZoom
    }

    this.state.map = new google.maps.Map(React.findDOMNode(this.refs.map), mapOptions);

    this.state.map.addListener('idle', this._handleIdle)
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount = () => {
    window.removeListener('resize', this._handleResize);
    this.state.map.removeEventListener('idle', this._handleIdle)
  };

  // EVENT HANDLERS
  _handleIdle = (event) => {
    let request = {
      bounds: this.state.map.getBounds(),
      types: ['restaurants', 'restaurant']
    };

    let service = new google.maps.places.PlacesService(this.state.map);
    service.radarSearch(request, this._handlePlacesSearch);
  };

  _handlePlacesSearch = (results, status, pagination) => {
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
