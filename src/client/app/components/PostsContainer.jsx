import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';
import PostSubmitter from '../components/PostSubmitter.jsx';


class PostsContainer extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        posts: PropTypes.Array,
        numPostsPerPage: 10,
        pageNum: 1,
    };
    this.renderPostCards = this.renderPostCards.bind(this);
    this.fetchPostCards = this.fetchPostCards.bind(this);
  }

  componentDidMount() {
    this.fetchPostCards();
  }

  componentDidUpdate(prevProps, prevState) {

    if(this.state.posts == prevState.posts){
      this.fetchPostCards();
    }
  }

  fetchPostCards(){
    var callDate = (new Date()).getTime();
    var startNum = (this.state.pageNum - 1) * this.state.numPostsPerPage;
    var endNum = (this.state.pageNum) * this.state.numPostsPerPage;

    axios({
      method:'get',
      url: this.props.queryUri,
      auth: {
        username: 'user1',
        password: 'password'
      },
      responseType: 'json',
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
    if(posts && posts.length != 0){
      return(
        posts.map(this.generatePostCard)
      );
    } else {
      return (
        <p>Nothing right now</p>
      );
    }
  }

  generatePostCard(post){

    var date = new Date(post.createDate);
    var formattedDate = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear()

    return <PostCard key={post.id} id={post.id} score = {post.score} vote={post.vote} title = {post.title} complete = {post.complete} createDate = {formattedDate} user = {post.username} userId = {post.userId} bodyText={post.bodyText} />;
  }

  render() {
  	return (
  	 	<div className="container posts-container">
      
        <PostSubmitter fetchFunction = {this.fetchPostCards}/>

  	 		{this.renderPostCards(this.state.posts)}
  	 	</div>
  	);
  }
}

export default PostsContainer;
