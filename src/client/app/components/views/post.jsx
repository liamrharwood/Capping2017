import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';

class Post extends React.Component {

	constructor(props){
		super(props);
		this.state = {

		};
	}

	render(){
		return (
			<Navbar />
		);
	}
}

export default Post;