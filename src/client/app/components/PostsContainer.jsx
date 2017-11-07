import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';

class PostsContainer extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
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
    var formattedDate = date.getUTCDate() + '/' + (date.getUTCMonth() + 1)+ '/' + date.getUTCFullYear()

    return <PostCard key={post.id} score = {post.score} vote={post.vote} title = {post.title} complete = {post.complete} createDate = {formattedDate} user = {post.username} bodyText={post.bodyText} />;
  }

  render() {
  	return (
  	 	<div className="container posts-container">
      <div className="input-group mb-4" style={{zIndex: 0}}>
        <input type="text" className="form-control" placeholder="Submit a new post" aria-label="Submit a new post" />
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button">Submit Post</button>
        </span>
      </div>
  	 		{this.renderPostCards(this.state.posts)}
  	 	</div>
  	);
  }
}

export default PostsContainer;
