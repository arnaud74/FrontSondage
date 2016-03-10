import {default as React, Component} from "react";
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export default class GettingStarted extends Component {

    state = {};

    _handleMapClick (event) {
        this.setState({
            marker: {position:{
                lat : event.latLng.lat(),
                lng : event.latLng.lng()
            }}
        });
    }

    render() {
        return (<GoogleMapLoader
                containerElement={<section style={{height: "200px",
            marginTop:"10px"}}/>}
                googleMapElement={<GoogleMap containerProps={{
          ...this.props,
          style: {
            height: "100%",
          },
        }}
        ref="map"
        defaultZoom={3}
        defaultCenter={{lat: 48.864716, lng: 2.349014}}
        onClick={this._handleMapClick.bind(this)}>
              <Marker
              {...this.state.marker}
              />
      </GoogleMap>}/>
        );
    }
}