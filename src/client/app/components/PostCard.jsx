import React from 'react';
import PropTypes from 'prop-types';
class PostCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };


  }

  render() {
  	return (
  	<div className="card post-card">
  		<div className="card-body container ml-2">
  				<div className="row">
	  				<div className="col-sm-1 container m-0">  			
	  					<div className="row "><i className="fa fa-thumbs-o-up voter ml-1" aria-hidden="true" /></div>	
	  					<div className="row mt-1">{this.props.votes}</div>	
	  					<div className="row mt-1"><i className="fa fa-thumbs-o-down voter ml-1" aria-hidden="true" /></div>	
	  					<div className="row mt-3"><i className="fa fa-gavel voter ml-1" aria-hidden="true" /></div>
	  				</div>
	  				<div className="col-sm-10 p-0">
	   					<h6 className="card-title title-link" href="#">{this.props.title}</h6>
	   					<h6 className="card-subtitle text-muted"><a className="text-muted" href="#">@{this.props.user}</a> {this.props.createDate}</h6>
	   				</div>
   				</div>
  		</div>
	</div>
  	);
  }
}

export default PostCard;
