import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class PostSubmitter extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			showSubmitter: false,
			submitterClass: "hideSubmitter",
			titleText: "",
			bodyText: "",
		}

		this.showSubmitter = this.showSubmitter.bind(this);
		this.hideSubmitter = this.hideSubmitter.bind(this);
		this.submitPost = this.submitPost.bind(this);
		this.handleBodyTextChange = this.handleBodyTextChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
	}

	showSubmitter () {
		this.setState({showSubmitter: true, submitterClass: "showSubmitter"})
	}

	hideSubmitter () {
		this.setState({showSubmitter: false, submitterClass: "hideSubmitter"})
	}

	handleBodyTextChange(e) {
		this.setState({ bodyText: e.target.value });
	}

	handleTitleChange(e) {
		this.setState({ titleText: e.target.value});
	}

	submitPost () {
		axios({
	      method:'post',
	      url: 'http://10.10.7.191:8080/posts',
	      auth: {
	        username: 'user1',
	        password: 'password'
	      },
	      data: {
	      	title: this.state.titleText,
	      	userId: 4,
	      	bodyText: this.state.bodyText,
	      	imgPath: '',
	      	communityIds: [1]
	      }
	    })  
	      .then(res => {
	        
	        this.hideSubmitter();
	        
	      }).catch(function (error) {
	        if (error.response) {
	          console.log(error.response.data);
	          console.log(error.response.status);
	          console.log(error.response.headers);
	        }
      });
	}


	render () {
		return (
			<div className= "card mb-4">
	      		<div className="input-group" style={{zIndex: 0}}>
				  	<input type="text" className="form-control" onChange={this.handleTitleChange} placeholder="Submit a new post" aria-label="Submit a new post" />
				  	<span className="input-group-btn">
			          <button className="btn btn-secondary" type="button" onClick={this.showSubmitter}>Create Post</button>
			        </span>
		        </div>
		        <div className={`card-body submitter ${this.state.submitterClass}`}>
		        	<form className="postForm">
		        		<div className="form-group">
		        			<label htmlFor="postBodyText">Post Text</label>
							<input type="text" className="form-control" id="postBodyText" onChange = {this.handleBodyTextChange} placeholder = "Enter your post's body text" aria-label="Enter your post's body text" />
						</div>
						<button type="button" className="btn btn-secondary" onClick = {this.hideSubmitter} >Close</button>
						<button type="button" className="btn btn-primary ml-4" onClick = {this.submitPost} >Submit New Post</button>
					</form>
		        </div>
	        </div>	 
		);
	}

}

export default PostSubmitter;
