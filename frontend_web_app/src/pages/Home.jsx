import React from 'react';
import Welcome from '../components/common/Welcome';

/**
 * PUBLIC_INTERFACE
 * Home - renders the Welcome landing experience at the root route.
 * Keeps routing unchanged by using this component as the index and "/" route.
 */
function Home() {
  return <Welcome />;
}

export default Home;
