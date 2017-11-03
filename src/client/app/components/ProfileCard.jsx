import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ProfileCard extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	queryUri: "http://10.10.7.191:8080/users/profile",
    	profileData: PropTypes.Object,
    };
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
//   	axios.get(this.state.queryUri, 
//   		{

//   		}, 
//   		{
//   			headers: {
//   				auth: {
// 			    	username: 'user1',
// 			    	password: 'password'
// 				}
// 			}
// 		}
// 
	axios({
		method:'get',
  		url: this.state.queryUri,
  		auth: {
  			username: 'user1',
  			password: 'password'
  		},
  		responseType: 'json'
	})
      .then(res => {
      	console.log(res);
        const profileData = res.data;
        this.setState({ profileData });
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  renderProfile(){
  	if(this.state.profileData){
  		return(
  			<div className = "card-body container">
  	 			<div className="row">
  	 				<div className="col-4"><img src={this.state.profileData.profileImg} /></div>
  	 				<div className="col-8">{this.state.profileData.firstName}&nbsp;{this.state.profileData.lastName}</div>
  	 			</div>
  	 			<div className="row">
  	 				<div className="col-4" />
  	 				<div className="col-8"><a className="text-muted" href="#">@{this.state.profileData.username}</a></div>
  	 			</div>
  	 			<div className="row mt-4">
  	 				<div className="col-4 follower-count"><a className="text-muted" href="#">Prayers <br />455 </a></div>
  	 				<div className="col-4 follower-count"><a className="text-muted" href="#">Followers <br />{this.state.profileData.followersCount} </a></div>
  	 				<div className="col-4 follower-count"><a className="text-muted" href="#">Following<br />{this.state.profileData.followedUsersCount}</a></div>
  	 			</div>
  	 			<div className="row mt-4">
  	 				<div className="col-12">I'm just a noob trying to get my 6k</div>
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

export default ProfileCard;
