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
import { ClipLoader } from 'react-spinners';

/**
*TODO
*
*/
class Report extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: PropTypes.Object,    //TODO
			reportStatus: 0,           //TODO
		};

		this.formatDate = this.formatDate.bind(this);
		this.submitReport = this.submitReport.bind(this);
		this.renderButton = this.renderButton.bind(this);
	}

	/**
	*TODO
	*
	*/
	componentDidMount(){
		this.fetchPostData(this.props);

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
		})  
		.then(res => {
			const data = res.data;
			this.setState({ data: data[0], score: data[0].score, vote: data[0].vote });
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
	submitReport(){
		var self = this;
		this.setState({ reportStatus: 1 });
		axios({
			method:'post',
			url: `${this.props.uri}/posts/reports`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json',
			data: {
				postId: this.props.match.params.postId,
				reportReason: ReactDOM.findDOMNode(this.refs.report).value,
			}
		}).then(res => {
			ReactDOM.findDOMNode(this.refs.report).value = "";
			this.setState({ reportStatus: 2 });
		}).catch(function (error) {
			if (error.response) {
				if(error.response.status == 401){
					props.unauth();
				} else {
					self.setState({ reportStatus: -1});
				}
			}
		});
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
	renderButton(){
		switch (this.state.reportStatus){
			case(0): // normal
				return (
					<div className ="col-3 offset-lg-9 offset-sm-6 offset-xs-4 mt-4 text-center">
						<button 
							className = "btn btn-primary" 
							onClick={this.submitReport}>
							Submit Report
						</button>
					</div>
				);
				break;
			case(1): // loading
				return (
					<div className="col-3 offset-lg-9 offset-sm-6 offset-xs-4 mt-4 text-center">
						<ClipLoader 
							loading={true} 
							size={25} 
							margin={"2px"} 
							color={"#633d91"} 
						/>
					</div>
				);
				break;
			case(2): // success
				return (
					<div className = "col-12 text-center mt-4">
						<div className="alert alert-success">
							Report submitted successfully! Thank you.
						</div>
					</div>
				);
				break;
			case(-1): // error
				return (
					<div className="col-12 text-center mt-4">
						<div className="alert alert-danger">
							There was an error in trying to submit your report.
						</div>
					</div>
				);
				break;
		}
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
						uri={this.props.uri}
						username={this.props.username} 
						unauth={this.props.unauth}
						history={this.props.history}
					/>
					<div className="container dashboard" >
						<div className = "row">
							<div className = "col-10 offset-1">
								<h1 className="mb-3">
									Report a Post
								</h1>
							</div>
						</div>
						<div className = "row">
							<div className = "col-10 offset-1">
								<div className = "card post-card">
									<div className ="card-body container ml-4">
										<div className = "row">
											<div className = "col-11">
												<h4 className = "card-title">
													{this.state.data.title}
												</h4>
												<h6 className="card-subtitle text-muted">
													<Link 
														to={`/users/${this.state.data.userId}`}  
														className="text-muted" >
														@{this.state.data.username}
													</Link> 
													{this.formatDate()}
												</h6>
												<h6 className="post-body mt-2">
													{this.state.data.bodyText}
												</h6>
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
											<label htmlFor="reportText">
												Report Reason
											</label>
											<textarea 
												ref="report" 
												className="form-control" 
												id="reportText" 
												style={{ height: 75 }} 
												maxLength="140" 
												placeholder = "Please describe why you are reporting this post" 
												aria-label="lease describe why you are reporting this post" 
											/>
											{this.renderButton()}

										</div>
									</div>
								</div>
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
						uri={this.props.uri}
						username={this.props.username} 
						unauth={this.props.unauth}
						history={this.props.history}
					/>
					<h4>
						Loading Post...
					</h4>
				</div>
			);
		}
	}
}

export default Report;
