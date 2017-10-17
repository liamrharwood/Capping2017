import React from 'react';
import {render} from 'react-dom';
import Navbar from './components/Navbar.jsx'

class App extends React.Component {
  render () {
    return(
    	<div>
    		
    		<Navbar />
    		<p> Pray for me!</p>
    	</div>
    	);
  }
}

render(<App/>, document.getElementById('app'));