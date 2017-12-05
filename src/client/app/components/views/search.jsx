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

		this.handleSearch = this.handleSearch.bind(this);
		this.keyPress = this.keyPress.bind(this);
	}

	/**
	*TODO
	*
	*/
	componentDidMount(){
		this.setState({ search: this.decodeSearch() });
		this.fetchSearchResults();
	}

	/**
	*TODO
	*
	*/
	componentDidUpdate(){
		ReactDOM.findDOMNode(this.refs.searchBig).value = this.decodeSearch();
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	decodeSearch(){
		return decodeURIComponent(this.props.match.params.search);
	}

	fetchSearchResults(){
		axios({
			method:'get',
			url: `${this.props.uri}/search?q=${this.props.match.params.search}`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json',
		}).then(res => {
			this.setState({ data: res.data })
		}).catch(function (error) {
			if (error.response) {
				
			}
		});
	}

	renderCommunitiesResults(data){

		console.log(data)
		if(!data){

			return <h3 className = "mt-5">Loading Results...</h3>

		} else if(data.communities.length == 0 && data.users.length == 0 && data.posts.length == 0){

			return <h3 className = "mt-5">Sorry, we couldn't find anything matching those search terms.</h3>

		} else if(data.communities.length > 0){

			return(
			<div className="row mt-4">
				<div className="col-12">
				 	<h2 className="search-section">Communities</h2>

				 	{data.communities.map((x) => this.generateCommunityResult(x) )}

				</div>
			</div>

			);
		} 
	}

	generateCommunityResult(community){
		return(
		<div key={community.communityId} className="mt-4">
			<h6 className="card-title">
				<Link 
					to={`/communities/${community.communityId}`} 
					className="post-title">
					{community.name}
				</Link>
			</h6>
			<h6 className="post-body mt-2">
				{community.description}
			</h6>
		</div>
		);
	}

	renderUsersResults(data){
		if(!data){
			return <p>Loading Results...</p>
		} else if(data.users.length > 0){
			return(
			<div className="row mt-4">
				<div className="col-12">
				 	<h2 className="search-section">Users</h2>

				 	{data.users.map((x) => this.generateUserResult(x) )}

				</div>
			</div>

			);
		}
	}

	generateUserResult(user){
		return(
		<div key={user.id} className="mt-4">
			<h5>{user.firstName} {user.lastName}</h5>
			<h5 className="card-subtitle text-muted">
				<Link 
					to={`/users/${user.id}`} 
					className="text-muted">
					@{user.username}
				</Link>
			</h5>
			<h6 className="post-body mt-2">
				{user.bio}
			</h6>
		</div>
		);
	}

	renderPostsResults(data){
		if(!data){
			return <p>Loading Results...</p>
		} else if(data.posts.length > 0){
			return(
			<div className="row mt-4">
				<div className="col-12">
				 	<h2 className="search-section">Posts</h2>

				 	{data.posts.map((x) => this.generatePostResult(x) )}

				</div>
			</div>

			);
		}
	}

	generatePostResult(post){
		return(
		<div key={post.id} className="mt-4">
			<h6 className="card-title">
				<Link 
					to={`/posts/${post.id}`} 
					className="post-title">
					{post.title}
				</Link>
			</h6>
			<h6 className="post-body mt-2">
				{post.bodyText}
			</h6>
		</div>
		);
	}

	handleSearch(){
	    var search = ReactDOM.findDOMNode(this.refs.searchBig).value;

	    if(search == ""){
	      return;
	    }
	    var encodedSearch = encodeURIComponent(search);

	    this.props.history.push(`/search/${encodedSearch}`);
    }

    keyPress(e){
        if(e.keyCode == 13){
           this.handleSearch();
        }
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

				<div className = "container dashboard pl-3 pr-3">
					<div className="row">
						<form className="form-inline col-10">
							<input 
								className="form-control col-6 mr-3" 
								type="search" 
	              				ref = "searchBig"
	              				onKeyDown={this.keyPress}
								placeholder="Search" 
								aria-label="Search"
							/>
							<button 
								className="btn btn-outline-dark my-2 my-sm-0" 
								type="button"
	              				onClick={this.handleSearch}>
								Search
							</button>
						</form>
					</div>

					{this.renderCommunitiesResults(this.state.data)}
					{this.renderUsersResults(this.state.data)}
					{this.renderPostsResults(this.state.data)}

				</div>
			</div>
		);
	}
}

export default Search;