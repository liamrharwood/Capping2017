import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';
import PostSubmitter from '../components/PostSubmitter.jsx';
import { PulseLoader } from 'react-spinners';

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
    this.generatePostCard = this.generatePostCard.bind(this);
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
      headers:{
        'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
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

  renderPostCards(posts, props){
    if(posts && posts.length != 0){
      return(
        posts.map((x) => this.generatePostCard(x, props) )
      );
    } else if (posts && posts.length == 0){
      return(
         <div className = "text-center mt-5" style={{ color: 'grey' }}><h4>No posts to show. Follow someone!</h4></div>
      );
    } else {
      return (
        <div className="text-center" style={{ paddingTop: "100px" }}>
          <PulseLoader loading={true} size={15} margin={"2px"} color={"#633d91"} />
        </div>
      );
    }
  }

  generatePostCard(post, props){

    var date = new Date(post.createDate);
    var formattedDate = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear()

    return <PostCard key={post.id} 
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
                     />;
  }

  render() {
  	return (
  	 	<div className="container posts-container">
      
        <PostSubmitter fetchFunction = {this.fetchPostCards} token={this.props.token} username={this.props.username} uri={this.props.uri}/>

  	 		{this.renderPostCards(this.state.posts, this.props)}
  	 	</div>
  	);
  }
}

PostsContainer.propTypes = {
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }

export default PostsContainer;
