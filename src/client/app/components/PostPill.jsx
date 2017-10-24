import React from 'react';
import PropTypes from 'prop-types';
class PostPill extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	title: "Can we all please just pray that ISIS would just get out of here, god please",
    	user: "BuildWallsForBalls",
    	date: "12/31/17",
    };


  }

  render() {
  	return (
  	<div className="card post-pill">
  		<div className="card-body">
   			<h6 className="card-title title-link" href="#">{this.state.title}</h6>
   			<h6 className="card-subtitle mb-2 text-muted" href="#">@{this.state.user} {this.state.date}</h6>
    		<a href="#" className="card-link">Upvote</a>
    		<a href="#" className="card-link">Report</a>
  		</div>
	</div>
  	);
  }
}

export default PostPill;
