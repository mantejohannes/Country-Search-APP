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
    <div className='container-details'>
    <div className="container d-flex align-items-center justify-content-center">
        <div className="card shadow" style={{ width: '1500px' }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <div style={{ height: '100%' }}>
              <img src={countryData.flags.png} className="card-img" alt={`Flag of ${countryData.name.common}`} style={{ objectFit: 'cover', height: '100%'}} />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{countryData.name.common}</h2>
              
              <div className="population-tld">
              <p className="card-text"> Native Name: {countryData.nativeName}</p>
              <p className="card-text-tld">Top Level Domain: {countryData.tld}</p>
              </div>

              <div className="population-tld">
              <p className="card-text">Population: {countryData.population}</p>
              <p className="card-text">Currency: {countryData.currencies[Object.keys(countryData.currencies)[0]].name}</p>

              </div>

              <div className="population-tld">
              <p className="card-text">Region: {countryData.region}</p>
              <p className="card-text-lang">Languages: {Object.values(countryData.languages)[0]}</p>

              </div>
              <p className="card-text">Sub Region: {countryData.subregion}</p>
              <p className="card-text">Capital: {countryData.capital}</p>


              <p className="card-text">Currency: {countryData.currencies[Object.keys(countryData.currencies)[0]].name}</p>

              <p className="card-text">Border Countries: <br></br> {Object.values(countryData.borders).map((borderCountry, index) => (
                  <span key={index} className="border-country">{borderCountry}</span>
                ))}</p>
              
              

             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
  );
};

export default CountryDetail;
