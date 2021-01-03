import React from 'react';
import './Map.css';
import { MapContainer as LeafletMap, TileLayer, useMap, useMapEvent } from 'react-leaflet';

function MyComponent({ center }) {
  const map = useMapEvent('click', () => {
    map.setCenter(center);
  });

  return (
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  );
}

function Map({ zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <MyComponent />
      </LeafletMap>
    </div>
  );
}

export default Map;
