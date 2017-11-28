import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';

class Settings extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			
		};
	}

	render(){
		return (
			<Navbar settings="active"/>
		);
	}
}

export default Settings;