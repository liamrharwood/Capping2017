import React from 'react';
import {render} from 'react-dom';
import Navbar from './components/Navbar.jsx';
import PostPill from './components/PostPill.jsx';

class App extends React.Component {
  render () {
    return(
    	<div>
    		<Navbar />
    		<PostPill />
    	</div>
    	);
  }
}

render(<App/>, document.getElementById('app'));