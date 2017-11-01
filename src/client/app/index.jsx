import React from 'react';
import {render} from 'react-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';

class App extends React.Component {
  render () {
    return(
    	<div>
    		<Navbar />
    		<Dashboard />
    	</div>
    	);
  }
}

render(<App/>, document.getElementById('app'));