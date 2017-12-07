import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Route,
	Link }
	from 'react-router-dom';

/**
*Mod Tools view
*Page for moderation tools
*/
class ModTools extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			profileData : PropTypes.Object,      //profile data for logged-in user
			reports: PropTypes.Array,			 // reports array
		};
		this.sendToPost = this.sendToPost.bind(this);
		this.deletePost = this.deletePost.bind(this);
	}

	/**
	*After component is mounted
	*Triggers re-rendering
	*/
	componentDidMount(){
		this.fetchReports();
	}

	/**
	*Acquires reports on community posts
	*JSON
	*/
	fetchReports(){
		axios({
		method:'get',
			url: `${this.props.uri}/moderators/reports?community_id=${this.props.match.params.communityId}`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json'
		}).then(res => {
			this.setState({ reports: res.data })
		}).catch(function (error) {
			if (error.response) {

			}
		});
	}

	/**
	*Displays the reports table
	*
	*@return {React Component} - Reports table
	*/
	renderReportsTable(){
		if(this.state.reports && this.state.reports.length > 0){
			return(
				<table className="table">
					<tbody>
						<tr>
							<th scope="col">Post</th>
							<th scope="col">Reporter</th>
							<th scope="col">Report Reason</th>
							<th scope="col">Delete Post</th>
						</tr>

						{this.generateReportRows()}
					</tbody>
				</table>
			);
		} else {
			return(<div className = "text-center mt-5" style={{ color: 'grey' }}>
				<h4>No reports to show.</h4>
			</div>);
		}
	}

	/**
	*Creates report rows based on number of reports from generateReportRows
	*
	*@return {Array} - report rows
	*/
	generateReportRows(){
		var reports = this.state.reports

		if(reports){
			return reports.map((x, index) => this.generateSingleReportRow(x, index) );
		}
	}

	/**
	*Creates a single report row
	*
	*@param {Object} report - report
	*@param {Int} index - index of reported post
	*@return {React Component} - single report row
	*/
	generateSingleReportRow(report, index){
		return (
		<tr key={index}>
			<td>
				<button 
					type="button" 
					className="btn btn-outline-info" 
					onClick={() => this.sendToPost(report.postId)}>
					Post
				</button>
			</td>
			<td>
				<Link 
					to={`/users/${report.userId}`} 
					className="text-muted">
					@{report.username}
				</Link>
			</td>
			<td>
				{report.reportReason}
			</td>
			<td>
				<button 
					type="button" 
					className="btn btn-outline-danger" 
					onClick={() => this.deletePost(report.postId)}>
					Delete Post
				</button>
			</td>
		</tr>
		);
	}

	/**
	*Redirects to individual post view for post that was reported
	*
	*@param {String} postId- post ID number
	*/
	sendToPost(postId){
		this.props.history.push(`/posts/${postId}`)
	}

	/**
	*Deletes reported post
	*
	*@param {String} postId- post ID number
	*/
	deletePost(postId){
		axios({
		method:'delete',
			url: `${this.props.uri}/moderators/posts?community_id=${this.props.match.params.communityId}&post_id=${postId}`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json'
		}).then(res => {
			this.fetchReports();
		}).catch(function (error) {
			if (error.response) {

			}
		});
	}

	/**
	*When component is mounted
	*
	*@return {React Component} - mod tools page
	*/
	render(){
		return (
			<div id="modTools">
				<Navbar 
					settings="active" 
					token={this.props.token} 
					username={this.props.username} 
					unauth={this.props.unauth} 
					uri={this.props.uri}
					history={this.props.history}
				/>
				
				<div className = "container dashboard">
					<div className="row">
						<div className="col-10 offset-1">
						{this.renderReportsTable()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ModTools;