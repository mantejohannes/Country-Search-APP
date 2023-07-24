import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBBtn } from 'mdb-react-ui-kit';
import '../components/styling.css'; // Import the CSS file

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearch = searchTerm => {
    const filtered = countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredCountries(filtered);
  };

  const history = useHistory();

  const handleCountryClick = countryCode => {
    history.push(`/country/${countryCode}`);
  };

  return (
    <div>
      <h1>Country List</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a country"
          onChange={e => handleSearch(e.target.value)}
        />
      </div>
      <div className="card-container">
        {filteredCountries.map(country => (
          <MDBCard key={country.cca3} className="country-card">
            <div className="flag-container">
              <MDBCardImage
                src={country.flags.png}
                position='top'
                alt={`Flag of ${country.name.common}`}
                className="flag-image"
              />
              <div className="outline" />
            </div>
            <MDBCardBody className="country-details">
              <MDBCardTitle>{country.name.common}</MDBCardTitle>
              <MDBCardText>
                Population: {country.population}
                <br />
                Region: {country.region}
                <br />
                Capital: {country.capital}
              </MDBCardText>
              <MDBBtn>
                <Link to={`/country/${country.cca3}`} onClick={() => handleCountryClick(country.cca3)}>
                  Learn More
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
