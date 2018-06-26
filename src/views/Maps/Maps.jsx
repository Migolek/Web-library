import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const CustomSkinMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: 51.949736, lng: 19.306759 }}
      defaultOptions={{
        scrollwheel: true,
        zoomControl: true,
        styles: [
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#f7f1df"
                  }
              ]
          },
          {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#d0e3b4"
                  }
              ]
          },
          {
              "featureType": "landscape.natural.terrain",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.business",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.medical",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#fbd3da"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#bde6ab"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#ffe15f"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#efd151"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#ffffff"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "black"
                  }
              ]
          },
          {
              "featureType": "transit.station.airport",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#cfb2db"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#a2daf2"
                  }
              ]
          }
      ]
      }}
    >
      <Marker position={{ lat: 52.407495, lng: 16.888839 }} />
      <Marker position={{ lat: 52.257137, lng: 20.988670 }} />
      <Marker position={{ lat: 50.297883, lng: 18.653329 }} /> 
      <Marker position={{ lat: 54.409222, lng: 18.627873 }} />
      <Marker position={{ lat: 51.780243, lng: 19.487095 }} />
      <Marker position={{ lat: 50.078898, lng: 19.983928 }} />
    </GoogleMap>
  ))
);

function Maps({ ...props }) {
  return (
    <CustomSkinMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTOplN8Q3jxxDAgYEVbzEAL6nJ0ZoyRG0"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

export default Maps;
