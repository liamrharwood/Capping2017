import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link }
from 'react-router-dom';

class PostCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      vote: this.props.vote,
      score: this.props.score,
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);

  }

  vote(vote){
    axios({
      method:'post',
      url: 'http://10.10.7.191:8080/posts/vote',
      auth: {
        username: 'user1',
        password: 'password'
      },
      data:{
        postId: this.props.id,
        direction: vote,
      }
    }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  upvote(){
    if(this.state.vote == 1){
      
      this.vote(0);
      this.setState({vote: 0, score: this.state.score - 1});

    } else  if (this.state.vote == 0){

      this.vote(1)
      this.setState({vote: 1, score: this.state.score + 1});

    } else {

      this.vote(1)
      this.setState({vote: 1, score: this.state.score + 2});

    }
  }

  downvote(){
    if(this.state.vote == -1){

      this.vote(0);
      this.setState({vote: 0, score: this.state.score + 1});

    } else  if (this.state.vote == 0){

      this.vote(-1);
      this.setState({vote: -1, score: this.state.score - 1});

    } else {

      this.vote(-1);
      this.setState({vote: -1, score: this.state.score - 2});

    }
  }

  renderVoter(){

    if(this.state.vote == 1){
      return (
        <div className="col-sm-1 container m-0 pl-0"> 
          <div className="row mx-auto"><i className="fa fa-thumbs-up voter" style={{color: "green"}} aria-hidden="true" onClick={this.upvote}/></div> 
          <div className="row mt-1 mx-auto">{this.state.score}</div>  
          <div className="row mt-1 mx-auto"><i className="fa fa-thumbs-o-down voter" aria-hidden="true" onClick={this.downvote}/></div> 
          <div className="row mt-3 mx-auto"><i className="fa fa-gavel voter" aria-hidden="true" /></div>
        </div>
      );
    } else if(this.state.vote == 0){
      return (
        <div className="col-sm-1 container m-0 pl-0"> 
          <div className="row mx-auto"><i className="fa fa-thumbs-o-up voter" aria-hidden="true" onClick={this.upvote}/></div> 
          <div className="row mt-1 mx-auto">{this.state.score}</div>  
          <div className="row mt-1 mx-auto"><i className="fa fa-thumbs-o-down voter" aria-hidden="true" onClick={this.downvote}/></div> 
          <div className="row mt-3 mx-auto"><i className="fa fa-gavel voter" aria-hidden="true" /></div>
        </div>
      );
    } else if(this.state.vote == -1){
      return (
        <div className="col-sm-1 container m-0 pl-0"> 
          <div className="row mx-auto"><i className="fa fa-thumbs-o-up voter" aria-hidden="true" onClick={this.upvote}/></div> 
          <div className="row mt-1 mx-auto">{this.state.score}</div>  
          <div className="row mt-1 mx-auto"><i className="fa fa-thumbs-down voter" style={{color: "red"}} aria-hidden="true" onClick={this.downvote}/></div> 
          <div className="row mt-3 mx-auto"><i className="fa fa-gavel voter" aria-hidden="true" /></div>
        </div>
      );
    }

  }

  render() {
  	return (
  	<div className="card post-card mb-3">
  		<div className="card-body container ml-2">
  				<div className="row">
	  				 			
	  					{this.renderVoter()}
	  				
	  				<div className="col-sm-10 p-0">
	   					<h6 className="card-title"><Link to={`/posts/${this.props.id}`} className="post-title">{this.props.title}</Link></h6>
	   					<h6 className="card-subtitle text-muted"><Link to={`/users/${this.props.userId}`}  className="text-muted" >@{this.props.user}</Link> {this.props.createDate}</h6>
              <h6 className="post-body mt-2">{this.props.bodyText}</h6>
	   				</div>
   				</div>
  		</div>
	</div>
  	);
  }
}

export default PostCard;
