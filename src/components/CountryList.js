import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBBtn } from 'mdb-react-ui-kit';
import '../components/styling.css'; 

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const history = useHistory();

  useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3')
    .then(response => {
      console.log('Countries Loaded:', response.data);
      setCountries(response.data);
      setFilteredCountries(response.data);
    })
    .catch(error => {
      console.error('API Error:', error);
    });
}, []);

  const handleSearch = e => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = countries.filter(country =>
      country.name?.common?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCountries(filtered);
  };

  const handleCountryClick = countryCode => {
    history.push(`/country/${countryCode}`);
  };

  return (
    <div>
      <h4>Where in the world?</h4>

      <div>
        <input
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={handleSearch}
          className="search"
        />
      </div>

      <p>Results found: {Array.isArray(filteredCountries) ? filteredCountries.length : 0}</p>

      <div className="card-container">
        {Array.isArray(filteredCountries) &&
          filteredCountries.map(country => (
            <MDBCard key={country.cca3} className="country-card">
              <div className="flag-container">
                <MDBCardImage
                  src={country.flags?.png}
                  position="top"
                  alt={`Flag of ${country.name?.common}`}
                  className="flag-image"
                />
              </div>

              <MDBCardBody className="country-details">
                <MDBCardTitle>{country.name?.common}</MDBCardTitle>

                <MDBCardText>
                  Population: {country.population?.toLocaleString()}
                  <br />
                  Region: {country.region || 'N/A'}
                  <br />
                  Capital: {country.capital ? country.capital[0] : 'N/A'}
                </MDBCardText>

                <MDBBtn className="linking">
                  <Link
                    className="font-link"
                    to={`/country/${country.cca3}`}
                    onClick={() => handleCountryClick(country.cca3)}
                  >
                    See More Info
                  </Link>
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          ))}
      </div>
    </div>
  );
};

export default CountryList;