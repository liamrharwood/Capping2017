import React from 'react';
import PropTypes from 'prop-types';

class ProfileCard extends React.Component {
	constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
  	return (
  	 	<div className="card profile-card">
  	 		<div className = "card-body container">
  	 			<div className="row">
  	 				<div className="col-3">IMG</div>
  	 				<div className="col-9">Joe Biden</div>
  	 			</div>
  	 			<div className="row">
  	 				<div className="col-3" />
  	 				<div className="col-9"><a className="text-muted" href="#">@BigBYessiree</a></div>
  	 			</div>
  	 			<div className="row">
  	 				<div className="col-6"><a className="text-muted" href="#"></a>39 Followers</div>
  	 				<div className="col-6"><a className="text-muted" href="#"></a>39 Followed</div>
  	 			</div>
  	 		</div>
  	 	</div>
  	);
  }
}

export default ProfileCard;
