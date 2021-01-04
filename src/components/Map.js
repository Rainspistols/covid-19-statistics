import React from 'react';
import './Map.css';
import { MapContainer as LeafletMap, TileLayer, useMap, Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const casesTypeColors = {
  cases: {
    hex: '#cc1034',
    multiplier: 300,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 450,
  },
  deaths: {
    hex: 'black',
    multiplier: 600,
  },
};

function DataOnMap({ data, casesType }) {
  return (
    <>
      {data.map((country) => (
        <Circle
          pathOptions={{
            color: casesTypeColors[casesType].hex,
            fill: casesTypeColors[casesType].hex,
          }}
          center={[country.countryInfo.lat, country.countryInfo.long]}
          fillOpacity={0.4}
          radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
          <Popup>
            <div className="info-container">
              <div
                className="info-flag"
                style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
              />
              <div className="info-name">{country.country}</div>
              <div className="info-confirmed">Cases: {numeral(country.cases).format('0,0')}</div>
              <div className="info-recovered">
                Recovered: {numeral(country.recovered).format('0,0')}
              </div>
              <div className="info-deaths">Deaths: {numeral(country.deaths).format('0,0')}</div>
            </div>
          </Popup>
        </Circle>
      ))}
    </>
  );
}

function Map({ center, zoom, countries, casesType }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={center} zoom={zoom} />
        <DataOnMap data={countries} casesType={casesType} />
      </LeafletMap>
    </div>
  );
}

export default Map;
