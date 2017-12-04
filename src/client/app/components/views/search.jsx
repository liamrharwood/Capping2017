import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';

class Search extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data: PropTypes.Object,
			search: PropTypes.String
		};
	}

	componentDidMount(){
		this.setState({ search: this.decodedSearch() })
	}

	decodedSearch(){
		return decodeURIComponent(this.props.match.params.search);
	}

	render(){
		return (
			<div id="search">
				<Navbar 
					token={this.props.token} 
					username={this.props.username} 
					unauth={this.props.unauth} 
					uri={this.props.uri}
					history={this.props.history}
				/>

				<div className = "dashboard container">
					<p>{this.decodedSearch()}</p>
				</div>
			</div>
		);
	}
}

export default Search;