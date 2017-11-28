import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';

class Post extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data: PropTypes.Array,
		};
	}

	componentDidMount(){
		this.fetchPostData(this.props);
	}

	fetchPostData(props){
		axios({
	      method:'get',
	      url: `http://10.10.7.191:8080/posts?post_id=${props.id}`,
	      auth: {
	        username: 'user1',
	        password: 'password'
	      },
	      responseType: 'json',
	    })  
	      .then(res => {
	        const data = res.data;
	        this.setState({ data });
	      }).catch(function (error) {
	        if (error.response) {
	          console.log(error.response.data);
	          console.log(error.response.status);
	          console.log(error.response.headers);
	        }
      });
	}

	render(){
		return (
		<div id="post">
			<Navbar />
			<div className="container" >
				<div className = "row">
					<div className = "col-10 offset-1">

					</div>
				</div>
			</div>
		</div>
		
		);
	}
}

export default Post;