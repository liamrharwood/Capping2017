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
  }

  componentDidMount() {
    axios.get(this.state.queryUri)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }

  componentDidUpdate() {
    console.log(this.state.posts);
  }

  render() {
  	return (
  	 	<div className="container">
  	 		<PostCard />
  	 	</div>
  	);
  }
}

export default PostsContainer;