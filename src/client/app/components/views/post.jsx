import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import CommentCard from '../CommentCard.jsx';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link }
from 'react-router-dom';
import axios from 'axios';

class Post extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data: PropTypes.Object,
			score: PropTypes.Integer,
			vote: PropTypes.Integer,
			comments: PropTypes.Array,
		};

		this.upvote = this.upvote.bind(this);
		this.downvote = this.downvote.bind(this);
		this.formatDate = this.formatDate.bind(this);
		this.submitComment = this.submitComment.bind(this);
	}

	componentDidMount(){
		this.fetchPostData(this.props);
		this.fetchComments();
	}

	fetchPostData(){
		axios({
	      method:'get',
	      url: `${this.props.uri}/posts?post_id=${this.props.match.params.postId}`,
	      headers:{
	        'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
	      },
	      responseType: 'json',
	    })  
	      .then(res => {
	        const data = res.data;
	        this.setState({ data: data[0], score: data[0].score, vote: data[0].vote });
	      }).catch(function (error) {
	        if (error.response) {
	          console.log(error.response.data);
	          console.log(error.response.status);
	          console.log(error.response.headers);
	        }
      });
	}

	fetchComments(){
		axios({
	      method:'get',
	      url: `${this.props.uri}/posts/comments?post_id=${this.props.match.params.postId}`,
	      headers:{
	        'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
	      },

	      responseType: 'json',
	    })  
	      .then(res => {
	        const data = res.data;
	        this.setState({ comments: data });
	      }).catch(function (error) {
	        if (error.response) {
	          console.log(error.response.data);
	          console.log(error.response.status);
	          console.log(error.response.headers);
	        }
      });
	}

	submitComment(){
		axios({
	      method:'post',
	      url: `${this.props.uri}/posts/comments`,
	      headers:{
	        'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
	      },

	      data: {
	      	postId: this.props.match.params.postId,
			bodyText: ReactDOM.findDOMNode(this.refs.comment).value,
	      }
	    })  
	      .then(res => {
	        ReactDOM.findDOMNode(this.refs.comment).value = ""
	        this.fetchComments();
	      }).catch(function (error) {
	        if (error.response) {
	          console.log(error.response.data);
	          console.log(error.response.status);
	          console.log(error.response.headers);
	        }
      });
	}

	vote(vote){
    axios({
      method:'post',
      url: `${this.props.uri}/posts/vote`,
      headers:{
	        'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
	      },

      data:{
        postId: this.props.match.params.postId,
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

  formatDate(){

  	var date = new Date(this.state.data.createDate);
    var formattedDate = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear()
    return formattedDate;

  }

  renderVoter(){

    if(this.state.vote == 1){
      return (
        <div className="col-1 container m-0 pl-0"> 
          <div className="row mx-auto"><i className="fa fa-thumbs-up voter" style={{color: "green"}} aria-hidden="true" onClick={this.upvote}/></div> 
          <div className="row mt-1 mx-auto">{this.state.score}</div>  
          <div className="row mt-1 mx-auto"><i className="fa fa-thumbs-o-down voter" aria-hidden="true" onClick={this.downvote}/></div> 
          <div className="row mt-3 mx-auto"><i className="fa fa-gavel voter" aria-hidden="true" /></div>
        </div>
      );
    } else if(this.state.vote == 0){
      return (
        <div className="col-1 container m-0 pl-0"> 
          <div className="row mx-auto"><i className="fa fa-thumbs-o-up voter" aria-hidden="true" onClick={this.upvote}/></div> 
          <div className="row mt-1 mx-auto">{this.state.score}</div>  
          <div className="row mt-1 mx-auto"><i className="fa fa-thumbs-o-down voter" aria-hidden="true" onClick={this.downvote}/></div> 
          <div className="row mt-3 mx-auto"><i className="fa fa-gavel voter" aria-hidden="true" /></div>
        </div>
      );
    } else if(this.state.vote == -1){
      return (
        <div className="col-1 container m-0 pl-0"> 
          <div className="row mx-auto"><i className="fa fa-thumbs-o-up voter" aria-hidden="true" onClick={this.upvote}/></div> 
          <div className="row mt-1 mx-auto">{this.state.score}</div>  
          <div className="row mt-1 mx-auto"><i className="fa fa-thumbs-down voter" style={{color: "red"}} aria-hidden="true" onClick={this.downvote}/></div> 
          <div className="row mt-3 mx-auto"><i className="fa fa-gavel voter" aria-hidden="true" /></div>
        </div>
      );
    }

  }

  renderCommentCards(comments){
    if(comments && comments.length != 0){
      return(
        comments.map(this.generateCommentCard)
      );
    } else {
      return (
        <div className = "text-center mt-5" style={{ color: 'grey' }}><h4>No comments yet...</h4></div>
      );
    }
  }

  generateCommentCard(comment){

  	var date = new Date (comment.createDate);
  	var createDate = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear()

  	return <CommentCard key={comment.id} id={comment.id} userId={comment.userId} username={comment.username} postId={comment.postId} bodyText={comment.bodyText} createDate = {createDate}/>
  }

	render(){
		if(this.state.data){
		return (
		<div id="post">
			<Navbar token={this.props.token} username={this.props.username} unauth={this.props.unauth} uri={this.props.uri}/>
			<div className="container dashboard" >
				<div className = "row">
					<div className = "col-10 offset-1">
						<div className = "card post-card">
							<div className ="card-body container ml-4">
								<div className = "row">

								{this.renderVoter()}
								<div className = "col-11">
									<h4 className = "card-title">{this.state.data.title}</h4>
									<h6 className="card-subtitle text-muted"><Link to={`/users/${this.state.data.userId}`}  className="text-muted" >@{this.state.data.username}</Link> {this.formatDate()}</h6>
              						<h6 className="post-body mt-2">{this.state.data.bodyText}</h6>
								</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className = "col-10 offset-1">
						<div className = "card">
							<div className = "card-body pb-1 container-fluid">
								<div className="form-group">
				        			<label htmlFor="commentText">Leave a Comment</label>
									<textarea ref="comment" className="form-control" id="commentText" style={{ height: 75 }} maxLength="140" placeholder = "Leave a comment for this prayer" aria-label="Leave a comment for this prayer" />
									<div className ="col-2 offset-lg-9 offset-sm-6 offset-xs-4 mt-4">
									<button className = "btn btn-primary" onClick={this.submitComment}>Submit Comment</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className = "row">
					<div className = "col-10 offset-1">

					{this.renderCommentCards(this.state.comments)}

					</div>
				</div>
			</div>
		</div> );
		} else {
			return (
			<div id="post">
				<Navbar token={this.props.token} username={this.props.username} />
				<h4>Loading Post...</h4>
			</div>
			);
		}
	
	}
}

export default Post;