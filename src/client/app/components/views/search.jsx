import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
*TODO
*
*/
class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: PropTypes.Object,     //TODO
			search: PropTypes.String    //TODO
		};
	}

	/**
	*TODO
	*
	*/
	componentDidMount(){
		this.setState({ search: this.decodeSearch() });
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	decodeSearch(){
		return decodeURIComponent(this.props.match.params.search);
	}

	/**
	*TODO
	*
	*@return {} -
	*/
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
					<p>
						{this.decodeSearch()}
					</p>
				</div>
			</div>
		);
	}
}

export default Search;