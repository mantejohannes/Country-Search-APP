import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const CountryDetail = () => {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState(null);
  const history = useHistory();

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

  const nativeName = countryData.name?.nativeName
    ? Object.values(countryData.name.nativeName)[0].common
    : countryData.name.common;

  const currency = countryData.currencies
    ? Object.values(countryData.currencies)[0].name
    : 'N/A';

  const languages = countryData.languages
    ? Object.values(countryData.languages).join(', ')
    : 'N/A';

  const borders = countryData.borders || [];

  return (
    <div className="container-details">
      <button className="back-button" onClick={() => history.goBack()}>
        Back
      </button>

      <div className="container d-flex align-items-center justify-content-center">
        <div className="card shadow" style={{ width: '1500px' }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={countryData.flags?.png}
                className="card-img"
                alt={`Flag of ${countryData.name.common}`}
                style={{ objectFit: 'cover', height: '100%' }}
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{countryData.name.common}</h2>

                <p>Native Name: {nativeName}</p>
                <p>Top Level Domain: {countryData.tld?.join(', ') || 'N/A'}</p>
                <p>Population: {countryData.population}</p>
                <p>Currency: {currency}</p>
                <p>Region: {countryData.region}</p>
                <p>Languages: {languages}</p>
                <p>Sub Region: {countryData.subregion || 'N/A'}</p>
                <p>Capital: {countryData.capital?.join(', ') || 'N/A'}</p>

                <p>
                  Border Countries: <br />
                  {borders.length > 0
                    ? borders.map((borderCountry, index) => (
                        <span key={index} className="border-country">
                          {borderCountry}
                        </span>
                      ))
                    : 'No border countries'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;