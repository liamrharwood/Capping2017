import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';
import PostSubmitter from '../components/PostSubmitter.jsx';
import { PulseLoader } from 'react-spinners';

/**
*Post Container component
*Used on the dashboard
*/
class PostsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: PropTypes.Array,    //Array of posts
			numPostsPerPage: 10,       //Pagination
			pageNum: 1,                //location
			callDate: PropTypes.number //called on
		};
		this.renderPostCards = this.renderPostCards.bind(this);
		this.fetchPostCards = this.fetchPostCards.bind(this);
		this.generatePostCard = this.generatePostCard.bind(this);
		this.loadMorePosts = this.loadMorePosts.bind(this);
	}

	/**
	*After component is mounted
	*Triggers re-rendering
	*/
	componentDidMount() {
		this.fetchPostCards();
	}

	/**
	*Updates posts
	*JSON
	*/
	fetchPostCards(){
		var callDate = (new Date()).getTime();
		var startNum = 0;
		var endNum = this.state.numPostsPerPage - 1;

		axios({
		  	method:'get',
		  	url: `${this.props.queryUri}?${this.props.communityId ? 'community_id=' + this.props.communityId + '&' : ''}${this.props.userId ? 'user_id=' + this.props.userId + '&' : ''}callDate=${callDate}&startNum=${startNum}&endNum=${endNum}`,
		  	headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json',
		}).then(res => {
			const posts = res.data;
			this.setState({ 
				posts: posts, 
				callDate: callDate, 
				pageNum: 1 });
		}).catch(function (error) {
			if (error.response) {
			
			}
		});
	}

	/**
	*Uses PostCard component to generate postcards.
	*
	*@param {Object} posts - post information
	*@param {Object} props - props
	*@return {React Component} - returns postcards, an empty dashboard, or loading icon
	*/
	renderPostCards(posts, props){
		if(posts && posts.length != 0){
			return(
				posts.map((x) => this.generatePostCard(x, props) )
			);
		} else if (posts && posts.length == 0){
			return(
				<div 
					className = "text-center mt-5" 
					style={{ color: 'grey' }}>
					<h4>
						No posts to show. Follow someone!
					</h4>
				</div>
			);
		} else {
			return (
				<div 
					className="text-center" 
					style={{ paddingTop: "100px" }}>
					<PulseLoader 
						loading={true} 
						size={15} 
						margin={"2px"} 
						color={"#633d91"}
					/>
				</div>
			);
		}
	}

	/**
	*Loads more posts, renders new posts
	*JSON
	*/
	loadMorePosts(){
		var page = this.state.pageNum + 1
		var startNum = (page - 1) * this.state.numPostsPerPage;
		var endNum = (page) * this.state.numPostsPerPage - 1;
		var callDate = this.state.callDate;

		axios({
		  	method:'get',
		  	url: `${this.props.queryUri}?${this.props.communityId ? 'community_id=' + this.props.communityId + '&' : ''}${this.props.userId ? 'user_id=' + this.props.userId + '&' : ''}callDate=${callDate}&startNum=${startNum}&endNum=${endNum}`,
		  	headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json',
		}).then(res => {
			const posts = res.data;
			var oldPosts = this.state.posts;
			var newPosts = oldPosts.concat(posts);
			this.setState({ posts: newPosts, pageNum: page})
		}).catch(function (error) {
			if (error.response) {
			
			}
		});
	}

	/**
	*Creates a new postcard, uses the PostCard.jsx component
	*
	*@param {} post -
	*@param {} props - 
	*@return {} - 
	*/
	generatePostCard(post, props){
		var date = new Date(post.createDate);
		var formattedDate = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
		return( 	
			<PostCard 
				key={post.id} 
				postId={post.id} 
				token={props.token} 
				username={props.username} 
				score = {post.score} 
				vote={post.vote} 
				title = {post.title} 
				complete = {post.complete} 
				createDate = {formattedDate} 
				user = {post.username} 
				userId = {post.userId} 
				bodyText={post.bodyText} 
				uri = {this.props.uri}
			/>
		);
	}

	/**
	*When component is mounted
	*@return {React Component} - post container, postcards by helper function
	*/
	render() {
		return (
			<div className="container posts-container">
				<PostSubmitter 
					fetchFunction = {this.fetchPostCards} 
					token={this.props.token} 
					username={this.props.username} 
					uri={this.props.uri}
					unath = {this.props.unauth}
				/>

				{this.renderPostCards(this.state.posts, this.props)}

				<button 
					type="button" 
					className="btn btn-outline-info mb-5" 
					style={{width: `100%`}} 
					onClick={this.loadMorePosts}>
					Load more posts
				</button>
			</div>
		);
	}
}

/**
*Sets proptype requirements
*/
PostsContainer.propTypes = {
	username: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
}

export default PostsContainer;
