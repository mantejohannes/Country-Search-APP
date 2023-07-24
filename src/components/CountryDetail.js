// components/CountryDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CountryDetail = () => {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then(response => {
        setCountryData(response.data[0]);
      })
      .catch(error => {
        console.error(error);
      });
  }, [countryCode]);

  if (!countryData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} />
      <p>Population: {countryData.population}</p>
      <p>Region: {countryData.region}</p>
      <p>Capital: {countryData.capital}</p>

      {/* Add other details you want to display */}
    </div>
  );
};

export default CountryDetail;
