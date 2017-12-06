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
import { PulseLoader } from 'react-spinners';

/**
*TODO
*
*/
class Post extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: PropTypes.Object,      //TODO
			updates: PropTypes.Array,
			score: PropTypes.Integer,    //TODO
			vote: PropTypes.Integer,     //TODO
			comments: PropTypes.Array,   //TODO
			loading: false,
		};

		this.upvote = this.upvote.bind(this);
		this.downvote = this.downvote.bind(this);
		this.formatDate = this.formatDate.bind(this);
		this.submitComment = this.submitComment.bind(this);
		this.submitUpdate = this.submitUpdate.bind(this);
		this.setAnswered = this.setAnswered.bind(this);
	}

	/**
	*TODO
	*
	*/
	componentDidMount(){
		this.fetchPostData(this.props);
		this.fetchUpdates();
		this.fetchComments();
	}

	/**
	*TODO
	*
	*/
	fetchPostData(){
		axios({
			method:'get',
			url: `${this.props.uri}/posts?post_id=${this.props.match.params.postId}`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json',
		}).then(res => {
			const data = res.data;
			this.setState({ 
				data: data[0], 
				score: data[0].score, 
				vote: data[0].vote,
			});
		}).catch(function (error) {
			if (error.response) {
				if(error.response.status == 401){
					props.unauth();
				}
			}
		});
	}

	fetchUpdates(){
		axios({
			method:'get',
			url: `${this.props.uri}/posts/updates?post_id=${this.props.match.params.postId}`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json',
		}).then(res => {
			const data = res.data;
			this.setState({ 
				updates: data
			});
		}).catch(function (error) {
			if (error.response) {
				if(error.response.status == 401){
					props.unauth();
				}
			}
		});
	}

	/**
	*TODO
	*
	*@return {} -
	*/
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
				if(error.response.status == 401){
					props.unauth();
				}
			}
		});
	}

	/**
	*TODO
	*
	*/
	submitComment(){

		this.setState({ loading: true });
		var self = this;

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
			ReactDOM.findDOMNode(this.refs.comment).value = "";
			this.setState({ loading: false })
			this.fetchComments();
		}).catch(function (error) {
			if (error.response) {
				if(error.response.status == 401){
					self.setState({ loading: false })
					props.unauth();
				}
			}
		});
	}

	/**
	*TODO
	*
	*/
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
				if(error.response.status == 401){
					props.unauth();
				}
			}
		});
	}

	/**
	*TODO
	*
	*/
	upvote(){
		if (this.state.vote == 1){
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

	/**
	*TODO
	*
	*/
	downvote(){
		if (this.state.vote == -1){
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

	/**
	*TODO
	*
	*@return {} -
	*/
	formatDate(){
		var date = new Date(this.state.data.createDate);
		var formattedDate = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear()
		return formattedDate;
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	renderVoter(){
		if(this.state.vote == 1){
			return (
				<div className="col-1 container m-0 pl-0"> 
					<div className="row mx-auto">
						<i 
							className="fa fa-thumbs-up voter" 
							style={{color: "green"}} 
							aria-hidden="true" 
							onClick={this.upvote}
						/>
					</div> 
					<div className="row mt-1 mx-auto">
						{this.state.score}
					</div>  
					<div className="row mt-1 mx-auto">
						<i 
							className="fa fa-thumbs-o-down voter" 
							aria-hidden="true" 
							onClick={this.downvote}
						/>
					</div> 
					<div className="row mt-3 mx-auto">
						<i 
							className="fa fa-gavel voter" 
							aria-hidden="true" 
						/>
					</div>
				</div>
			);
		} else if(this.state.vote == 0){
			return (
				<div className="col-1 container m-0 pl-0"> 
					<div className="row mx-auto">
						<i 
							className="fa fa-thumbs-o-up voter" 
							aria-hidden="true" 
							onClick={this.upvote}
						/>
					</div> 
					<div className="row mt-1 mx-auto">
						{this.state.score}
					</div>  
					<div className="row mt-1 mx-auto">
						<i 
							className="fa fa-thumbs-o-down voter" 
							aria-hidden="true" 
							onClick={this.downvote}
						/>
					</div> 
					<div className="row mt-3 mx-auto">
						<i 
							className="fa fa-gavel voter" 
							aria-hidden="true"
						/>
					</div>
				</div>
			);
		} else if(this.state.vote == -1){
			return (
				<div className="col-1 container m-0 pl-0"> 
					<div className="row mx-auto">
						<i 
							className="fa fa-thumbs-o-up voter" 
							aria-hidden="true" 
							onClick={this.upvote}
						/>
					</div> 
					<div className="row mt-1 mx-auto">
						{this.state.score}
					</div>  
					<div className="row mt-1 mx-auto">
						<i 
							className="fa fa-thumbs-down voter" 
							style={{color: "red"}} 
							aria-hidden="true" 
							onClick={this.downvote}
						/>
					</div> 
					<div className="row mt-3 mx-auto">
						<i 
							className="fa fa-gavel voter" 
							aria-hidden="true" 
						/>
					</div>
				</div>
			);
		}
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	renderCommentCards(comments){
		if(comments && comments.length != 0){
			return(
				comments.map(this.generateCommentCard)
			);
		} else {
			return (
				<div 
					className = "text-center mt-5" 
					style={{ color: 'grey' }}>
					<h4>
						No comments yet...
					</h4>
				</div>
			);
		}
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	generateCommentCard(comment){

		var date = new Date (comment.createDate);
		var createDate = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
		return (
			<CommentCard 
				key={comment.id} 
				id={comment.id} 
				userId={comment.userId} 
				username={comment.username} 
				postId={comment.postId} 
				bodyText={comment.bodyText} 
				createDate = {createDate}
			/>
		);
	}

	renderUpdates(updates){
		if(updates && updates.length != 0){
			return(
				updates.map((x,index) => this.generateUpdate(x,index))
			);
		}
	}

	generateUpdate(update,index){
		// var date = new Date (update.createDate);
		// var createDate = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
		return (
			<div className="updateCard container">
				<div className = "row">
					<div key={index} className = "col-10 offset-1">
						{update.bodyText}
					</div>
				</div>
			</div>
		);
	}

	renderUpdateSubmitter(){
		if(this.state.data.userId == this.props.userId){
			return(
				<div className="form-group container">
					<div className="row">
						<label htmlFor="updateText">
							Leave an update about your prayer!
						</label>
						<textarea 
							ref="update" 
							className="form-control" 
							id="updateText" 
							style={{ height: 75 }} 
							maxLength="140" 
							placeholder = "Update on your situtation" 
							aria-label="Update on your situtation" 
						/>
					</div>
					<div className="row text-center">
						<div className ="col-12 col-sm-6 col-md-4 offset-md-4 mt-4">
							<button 
								className = "btn btn-success" 
								onClick={this.setAnswered}>
								Mark Answered
							</button>
						</div>
						<div className ="col-12 col-sm-6 col-md-4 mt-4">
							<button 
								className = "btn btn-primary" 
								onClick={this.submitUpdate}>
								Submit Update
							</button>
						</div>
					</div>
				</div>
			);
		}
	}

	submitUpdate(){
		axios({
			method:'post',
			url: `${this.props.uri}/posts/updates`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			data:{
				postId: this.props.match.params.postId,
				bodyText: ReactDOM.findDOMNode(this.refs.update).value,
				complete: false,
			}
		}).then(res => {
			this.fetchUpdates();
		}).catch(function (error) {
			if (error.response) {
				if(error.response.status == 401){
					props.unauth();
				}
			}
		});
	}

	setAnswered(){
		axios({
			method:'post',
			url: `${this.props.uri}/posts/updates`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			data:{
				postId: this.props.match.params.postId,
				bodyText: ReactDOM.findDOMNode(this.refs.update).value,
				complete: true,
			}
		}).then(res => {
			this.fetchUpdates();
		}).catch(function (error) {
			if (error.response) {
				if(error.response.status == 401){
					props.unauth();
				}
			}
		});
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	render(){
		if (this.state.data){
			return (
				<div id="post">
					<Navbar 
						token={this.props.token} 
						username={this.props.username} 
						unauth={this.props.unauth} 
						uri={this.props.uri} 
						history={this.props.history}
					/>
					<div className="container dashboard" >
						<div className = "row">
							<div className = "col-10 offset-1">
								<div className = "card post-card">
									<div className ="card-body container">
										<div className = "row ml-3">
											{this.renderVoter()}
											<div className = "col-11">
												<h4 className = "card-title">
													{this.state.data.title}
												</h4>
												<h6 className="card-subtitle text-muted">
													<Link 
														to={`/users/${this.state.data.userId}`}  
														className="text-muted">
														@{this.state.data.username}&nbsp;
													</Link>
													{this.formatDate()}
													{this.state.data.complete ? <button type="button" className="btn btn-outline-success select-all-button ml-sm-2 mt-sm-0 mt-2" disabled>Answered!</button> : ""}
												</h6>
												<h6 className="post-body mt-2">
													{this.state.data.bodyText}
												</h6>
											</div>
										</div>
										<div className = "row">
											<div className="col-12">
											{this.renderUpdates(this.state.updates)}
											</div>
										</div>
										<div className = "row mt-4">
											<div className="col-12">
											{this.renderUpdateSubmitter()}
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
											<label htmlFor="commentText">
												Leave a Comment
											</label>
											<textarea 
												ref="comment" 
												className="form-control" 
												id="commentText" 
												style={{ height: 75 }} 
												maxLength="140" 
												placeholder = "Leave a comment for this prayer" 
												aria-label="Leave a comment for this prayer" 
											/>
											<div className ="col-2 offset-lg-9 offset-sm-6 offset-xs-4 mt-4">
												<button 
													className = "btn btn-primary" 
													onClick={this.submitComment}>
													{this.state.loading ? <PulseLoader loading={true} size={15} margin={"2px"} color={"white"}/> : "Submit Comment"}
												</button>
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
				</div>
			);
		} else {
			return (
				<div id="post">
					<Navbar 
						token={this.props.token} 
						username={this.props.username}
						/>
					<h4>
						Loading Post...
					</h4>
				</div>
			);
		}
	}
}

export default Post;