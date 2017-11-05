import React from 'react';
import PropTypes from 'prop-types';
import PostsContainer from '../components/PostsContainer.jsx'
import ProfileCard from '../components/ProfileCard.jsx';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  render() {
  	return (
  	 <div className="container dashboard">
     <div className="row">
      <div className="col-8">
        <PostsContainer queryUri="http://10.10.7.191:8080/posts"/>
      </div>
      <div className="col-4">
        <ProfileCard />
      </div>
      </div>
     </div>
  	);
  }
}

export default Dashboard;