import React from 'react';
import {render} from 'react-dom';
import TestComponent from './TestComponent.jsx'

class App extends React.Component {
  render () {
    return(
    	<div>
    		<p> Pray for me!</p>
    		<TestComponent />
    	</div>
    	);
  }
}

render(<App/>, document.getElementById('app'));