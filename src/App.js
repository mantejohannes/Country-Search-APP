import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CountryList} />
        <Route path="/country/:countryCode" component={CountryDetail} />
      </Switch>
    </Router>
  );
};

export default App;
