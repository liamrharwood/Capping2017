import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link }
from 'react-router-dom';

class ProfileCard extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	profileData: PropTypes.Object,
    };

    this.follow = this.follow.bind(this);
    this.unFollow = this.unFollow.bind(this);
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.location != prevProps.location){
      this.fetchUserProfile();
    }
  }

  fetchUserProfile() {
    if(this.props.id){
    	axios({
    		method:'get',
      		url: `${this.props.queryUri}/profile?user_id=${this.props.id}`,
      		auth: {
      			username: 'user1',
      			password: 'password'
      		},
      		responseType: 'json'
    	})
          .then(res => {
            const profileData = res.data;
            this.setState({ profileData });
          }).catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
      });
    } else {
      axios({
        method:'get',
          url: `${this.props.queryUri}/profile`,
          auth: {
            username: 'user1',
            password: 'password'
          },
          responseType: 'json'
      })
          .then(res => {
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
  }

  renderFollowButton() {
    if(this.props.type=="user-profile" && this.state.profileData.username != "user1"){
      if(!this.state.profileData.following){
        return (
          <div className="row mt-2">
            <div className= "col-6 offset-3">
              <button type="button" className="btn btn-block btn-info" onClick={this.follow}>Follow</button>
            </div>
          </div>
          );
      } else {
        return (
          <div className="row mt-2">
            <div className= "col-6 offset-3">
              <button type="button" className="btn btn-block btn-outline-secondary" onClick={this.unFollow}>Followed</button>
            </div>
          </div>)
      }
    } else {
      return null;
    }
  }

  follow(){
    axios({
      method:'put',
        url: `${this.props.queryUri}/follow?user_id=${this.props.id}`,
        auth: {
          username: 'user1',
          password: 'password'
        },
    }).then(res => {
      this.fetchUserProfile();
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  unFollow() {
    axios({
      method:'put',
        url: `${this.props.queryUri}/unfollow?user_id=${this.props.id}`,
        auth: {
          username: 'user1',
          password: 'password'
        },
    }).then(res => {
        this.fetchUserProfile();
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
  	 				<div className="col-4"><img src="" /></div>
  	 				<div className="col-8">{this.state.profileData.firstName}&nbsp;{this.state.profileData.lastName}</div>
  	 			</div>
  	 			<div className="row">
  	 				<div className="col-4" />
  	 				<div className="col-8"><Link to={`/users/4`} className="text-muted" >@{this.state.profileData.username}</Link></div>
  	 			</div>

              {this.renderFollowButton()}

  	 			<div className="row mt-4">
  	 				<div className="col-4"><a className="follower-count" href="#">Prayers <br />{this.state.profileData.postCount} </a></div>
  	 				<div className="col-4"><a className="follower-count" href="#">Followers <br />{this.state.profileData.followersCount} </a></div>
  	 				<div className="col-4"><a className="follower-count" href="#">Following<br />{this.state.profileData.followedUsersCount}</a></div>
  	 			</div>
  	 			<div className="row mt-4">
  	 				<div className="col-12">{this.state.profileData.bio}</div>
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
