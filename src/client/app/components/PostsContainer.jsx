import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';
import PostSubmitter from '../components/PostSubmitter.jsx';
import { PulseLoader } from 'react-spinners';

/**
*TODO
*
*/
class PostsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: PropTypes.Array,  //TODO
			numPostsPerPage: 10,     //TODO
			pageNum: 1,              //TODO
		};
		this.renderPostCards = this.renderPostCards.bind(this);
		this.fetchPostCards = this.fetchPostCards.bind(this);
		this.generatePostCard = this.generatePostCard.bind(this);
	}

	/**
	*TODO
	*
	*/
	componentDidMount() {
		this.fetchPostCards();
	}

	/**
	*TODO
	*
	*@param {} prevProps - 
	*@param {} prevState - 
	*/
	componentDidUpdate(prevProps, prevState) {
		if(this.state.posts == prevState.posts){
			this.fetchPostCards();
		}
	}

	/**
	*TODO
	*
	*/
	fetchPostCards(){
		var callDate = (new Date()).getTime();
		var startNum = (this.state.pageNum - 1) * this.state.numPostsPerPage;
		var endNum = (this.state.pageNum) * this.state.numPostsPerPage - 1;

		axios({
		  	method:'get',
		  	url: `${this.props.queryUri}?${this.props.communityId ? 'community_id=' + this.props.communityId + '&' : ''}${this.props.userId ? 'user_id=' + this.props.userId + '&' : ''}callDate=${callDate}&startNum=${startNum}&endNum=${endNum}`,
		  	headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json',
		}).then(res => {
			const posts = res.data;
			this.setState({ posts });
		}).catch(function (error) {
			if (error.response) {
			
			}
		});
	}

	/**
	*TODO
	*
	*@param {} posts -
	*@param {} props -
	*@return {} - 
	*/
	renderPostCards(posts, props){
		if(posts && posts.length != 0){
			return(
				posts.map((x) => this.generatePostCard(x, props) )
			);
		} else if (posts && posts.length == 0){
			return(
				<div className = "text-center mt-5" style={{ color: 'grey' }}>
					<h4>No posts to show. Follow someone!</h4>
				</div>
			);
		} else {
			return (
				<div className="text-center" style={{ paddingTop: "100px" }}>
					<PulseLoader loading={true} size={15} margin={"2px"} color={"#633d91"}/>
				</div>
			);
		}
	}

	/**
	*TODO
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
	*TODO
	*
	*@return {} - 
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
			</div>
		);
	}
}

/**
*TODO
*
*/
PostsContainer.propTypes = {
	username: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
}

export default PostsContainer;
