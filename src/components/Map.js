import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const Map = ({ center, markers = [] }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyBOHbwot29UioUB1ZdRwQCkc0tYUDTSlGI",
      version: "weekly",
      libraries: ['places'], // Puedes agregar las librerías que necesites
    });

    const initializeMap = async () => {
      await loader.importLibrary("maps");
      if (mapRef.current && !map) {
        const newMap = new window.google.maps.Map(mapRef.current, {
          center: center,
          zoom: 12,
        });
        setMap(newMap);
      }
    };

    initializeMap();
  }, [center, map]);

  useEffect(() => {
    if (map) {
      markers.forEach((markerPosition) => {
        new window.google.maps.Marker({
          position: markerPosition,
          map: map,
        });
      });
    }
  }, [markers, map]);

  return <div ref={mapRef} style={containerStyle}></div>;
};

export default Map;
