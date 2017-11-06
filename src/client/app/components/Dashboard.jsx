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
      case ("user-profile"): return (<ProfileCard />);
      case ("community-profile"): return (<CommunityCard queryUri = {this.props.profileQueryUri} />);
      default: return(<p>Bad Profile Prop</p>);
    }
  }

  render() {
  	return (
  	 <div className="container dashboard">
     <div className="row">
      <div className="col-8">
        <PostsContainer queryUri = {this.props.postsQueryUri}/>
      </div>
      <div className="col-4">
        {this.renderInfoCard()}
      </div>
      </div>
     </div>
  	);
  }
}

export default Dashboard;