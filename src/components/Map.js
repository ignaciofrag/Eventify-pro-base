import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const Map = ({ center, markers = [] }) => (
  <LoadScript googleMapsApiKey="AIzaSyBOHbwot29UioUB1ZdRwQCkc0tYUDTSlGI">
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12} // Aumenta el zoom para un mejor enfoque en la ciudad
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </GoogleMap>
  </LoadScript>
);

export default Map;
