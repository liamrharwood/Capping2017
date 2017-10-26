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
        postcards: [],
    };
  }

  componentDidMount() {
    axios.get(this.state.queryUri)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      });
  }

  componentDidUpdate() {
    console.log(this.state.posts);
    var posts = this.state.posts;
    var array = [];
    for(var i = 0; i < posts.length; i++){
      array.push(
        <PostCard key={i} votes = {posts[i].upvotes - posts[i].downvotes} title = {posts[i].title} complete = {posts[i].complete} createDate = {posts[i].createDate} user = {posts[i].userId} />
      );
    }

    this.state.postcards = array;

    console.log(this.state.postcards);
  }

  render() {
  	return (
  	 	<div className="container">
  	 		{this.state.postcards}
  	 	</div>
  	);
  }
}

export default PostsContainer;