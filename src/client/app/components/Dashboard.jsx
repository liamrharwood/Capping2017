import React from 'react';
import PropTypes from 'prop-types';
import PostsContainer from '../components/PostsContainer.jsx';
import ProfileCard from '../components/ProfileCard.jsx';
import CommunityCard from '../components/CommunityCard.jsx';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  renderInfoCard(){
    switch(this.props.infoCard){
      case ("home"): return (<ProfileCard token={this.props.token} username={this.props.username} location = {this.props.location} queryUri={this.props.profileQueryUri} type="home" uri={this.props.uri} />);
      case ("user-profile"): return (<ProfileCard token={this.props.token} username={this.props.username} location = {this.props.location} queryUri={this.props.profileQueryUri} id={this.props.id} type="user-profile" uri={this.props.uri}/>);
      case ("community-profile"): return (<CommunityCard token={this.props.token} username={this.props.username} location = {this.props.location} queryUri = {this.props.profileQueryUri} id={this.props.id} type = "community-profile" uri={this.props.uri}/>);
      default: return(<p>Bad Profile Prop</p>);
    }
  }

  render() {
  	return (
  	 <div className="container dashboard">
     <h1 className="pl-3 pb-4">What's New</h1>
     <div className="row">
      <div className="col-lg-8 col-12">
        <PostsContainer queryUri = {this.props.postsQueryUri} token={this.props.token} username={this.props.username} uri={this.props.uri}/>
      </div>
      <div className="col-md-4 d-none d-lg-block">
        {this.renderInfoCard()}
      </div>
      </div>
     </div>
  	);
  }
}

export default Dashboard;