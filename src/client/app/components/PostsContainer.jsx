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
        numPostsPerPage: 10,
        pageNum: 1
    };
    this.renderPostCards = this.renderPostCards.bind(this);
    this.fetchPostCards = this.fetchPostCards.bind(this);
  }

  componentDidMount() {
    this.fetchPostCards();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.posts == prevState.posts){
      this.fetchPostCards
    }
  }

  fetchPostCards(){
    var callDate = (new Date()).getTime();
    var startNum = (this.state.pageNum - 1) * this.state.numPostsPerPage;
    var endNum = (this.state.pageNum) * this.state.numPostsPerPage;

    axios.get(this.state.queryUri, {
      callDate: callDate,
      startNum: startNum,
      endNum: endNum,
    })
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
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

    var date = new Date(post.createDate);
    var formattedDate = date.getUTCDate() + '/' + (date.getUTCMonth() + 1)+ '/' + date.getUTCFullYear()

    return <PostCard key={post.id} votes = {post.upvotes - post.downvotes} title = {post.title} complete = {post.complete} createDate = {formattedDate} user = {post.username} bodyText={post.bodyText} />;
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
