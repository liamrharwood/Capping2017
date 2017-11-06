import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class CommunityCard extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	data: PropTypes.Object,
    };
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
	axios({
		method:'get',
  		url: this.props.queryUri,
  		auth: {
  			username: 'user1',
  			password: 'password'
  		},
  		responseType: 'json'
	})
      .then(res => {
        const data = res.data;
        this.setState({ data });
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  renderProfile(){
  	if(this.state.data){
  		return(
  			<div className = "card-body container">
  	 			<div className="row">
  	 				<h4 className="col-12 card-title">{this.state.data.name}</h4>
  	 			</div>
  	 			<div className="row mt-4">
  	 				<div className="col-6"><a className="community-count" href="#">Prayers <br />{this.state.data.postCount} </a></div>
  	 				<div className="col-6"><a className="community-count" href="#">Followers <br />{this.state.data.followerCount} </a></div>
  	 			</div>
  	 			<div className="row mt-4">
  	 				<div className="col-12">
              {this.state.data.description}
            </div>
  	 			</div>
  	 		</div>
  		);
  	} else {
  		return (<p>Loading</p>);
  	}
  }

  render() {
  	return (
  	 	<div className="card profile-card">
  	 		{this.renderProfile()}
  	 	</div>
  	);
  }
}

export default CommunityCard;
