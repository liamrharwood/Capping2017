import React from 'react';
import PropTypes from 'prop-types';

class PostCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      vote: 0,
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);

  }

  upvote(){
    if(this.state.vote == 1){
      this.setState({vote: 0});
    } else {
      this.setState({vote: 1});
    }
  }

  downvote(){
    if(this.state.vote == -1){
      this.setState({vote: 0});
    } else {
      this.setState({vote: -1});
    }
  }

  renderVoter(){

    if(this.state.vote == 1){
      return (
        <div className="col-sm-1 container m-0 pl-0"> 
          <div className="row mx-auto"><i className="fa fa-thumbs-up voter" style={{color: "green"}} aria-hidden="true" onClick={this.upvote}/></div> 
          <div className="row mt-1 mx-auto">{this.props.votes + 1}</div>  
          <div className="row mt-1 mx-auto"><i className="fa fa-thumbs-o-down voter" aria-hidden="true" onClick={this.downvote}/></div> 
          <div className="row mt-3 mx-auto"><i className="fa fa-gavel voter" aria-hidden="true" /></div>
        </div>
      );
    } else if(this.state.vote == 0){
      return (
        <div className="col-sm-1 container m-0 pl-0"> 
          <div className="row mx-auto"><i className="fa fa-thumbs-o-up voter" aria-hidden="true" onClick={this.upvote}/></div> 
          <div className="row mt-1 mx-auto">{this.props.votes}</div>  
          <div className="row mt-1 mx-auto"><i className="fa fa-thumbs-o-down voter" aria-hidden="true" onClick={this.downvote}/></div> 
          <div className="row mt-3 mx-auto"><i className="fa fa-gavel voter" aria-hidden="true" /></div>
        </div>
      );
    } else if(this.state.vote == -1){
      return (
        <div className="col-sm-1 container m-0 pl-0"> 
          <div className="row mx-auto"><i className="fa fa-thumbs-o-up voter" aria-hidden="true" onClick={this.upvote}/></div> 
          <div className="row mt-1 mx-auto">{this.props.votes - 1}</div>  
          <div className="row mt-1 mx-auto"><i className="fa fa-thumbs-down voter" style={{color: "red"}} aria-hidden="true" onClick={this.downvote}/></div> 
          <div className="row mt-3 mx-auto"><i className="fa fa-gavel voter" aria-hidden="true" /></div>
        </div>
      );
    }

  }

  render() {
  	return (
  	<div className="card post-card mb-3">
  		<div className="card-body container ml-2">
  				<div className="row">
	  				 			
	  					{this.renderVoter()}
	  				
	  				<div className="col-sm-10 p-0">
	   					<h6 className="card-title title-link" href="#">{this.props.title}</h6>
	   					<h6 className="card-subtitle text-muted"><a className="text-muted" href="#">@{this.props.user}</a> {this.props.createDate}</h6>
              <h6 className="post-body mt-2">{this.props.bodyText}</h6>
	   				</div>
   				</div>
  		</div>
	</div>
  	);
  }
}

export default PostCard;
