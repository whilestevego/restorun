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

  handleResize = (event) => {
    this.setState({window: {width: window.innerWidth, height: window.innerHeight}});
  };

  componentDidMount = () => {
    let mapOptions = {
      center: this.mapCenterLatLng(),
      zoom: this.props.initialZoom
    }

    let map = new google.maps.Map(React.findDOMNode(this.refs.map), mapOptions);

    this.setState({map: map});

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
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
