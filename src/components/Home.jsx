import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Link to='/alerts' id='home-page'>
        <div id='home'>Alerts</div>
    </Link>
  );
}

export default Home;
