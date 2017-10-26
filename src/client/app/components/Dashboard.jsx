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
  	 <div className="container mt-3">
     <div className="row">
      <div className="col-8">
        <PostsContainer />
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