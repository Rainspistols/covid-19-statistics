import React, { useState, useEffect } from 'react';
// Css
import './App.css';
import 'leaflet/dist/leaflet.css';
// Utils
import { sortData } from './components/utils';
// Maaterial UI
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
// Components
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import { useMapEvents } from 'react-leaflet';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);

  const allDiseasesUlr = 'https://disease.sh/v3/covid-19/countries';

  useEffect(() => {
    const getAllCountriesInfo = async () =>
      await fetch('https://disease.sh/v3/covid-19/all')
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });

    getAllCountriesInfo();
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(allDiseasesUlr)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onSelectedCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(event.target.value);

    const url =
      countryCode === 'worldwide'
        ? allDiseasesUlr
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountry(countryCode);
        setCountryInfo(data);

        console.log([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);

        // const map = useMapEvents({
        //   locationfound(e) {
        //     setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        //     map.flyTo([data.countryInfo.lat, data.countryInfo.long], map.getZoom());
        //   },
        // });
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID - 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={selectedCountry} onChange={onSelectedCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem value={country.value} key={index}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases for last 120 days</h3>
          <LineGraph />
        </CardContent>
        {/* Table */}
        {/* Graph */}
      </Card>
    </div>
  );
}

export default App;

// BEM, React, Css, Js, react-chartjs-2
