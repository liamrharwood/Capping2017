import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';

class PostsContainer extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        queryUri: "http://10.10.7.191:8080/posts",
        posts: PropTypes.Array,
    };
    this.renderPostCards = this.renderPostCards.bind(this);
  }

  componentDidMount() {
    axios.get(this.state.queryUri)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
  }

  componentDidUpdate() {
    console.log(this.state.posts);
    var posts = this.state.posts;
    var array = [];
  }

  renderPostCards(posts){
    if(posts){
      console.log("1");
      return(
        posts.map(this.generatePostCard)
      );
    } else {
      console.log("2");
      return (
        <p>Nothing right now</p>
      );
    }
  }

  generatePostCard(post){
    return <PostCard key={post} votes = {post.upvotes - post.downvotes} title = {post.title} complete = {post.complete} createDate = {post.createDate} user = {post.userId} />;
  }

  render() {
  	return (
  	 	<div className="container posts-container">
  	 		{this.renderPostCards(this.state.posts)}
  	 	</div>
  	);
  }
}

export default PostsContainer;