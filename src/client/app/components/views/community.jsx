import React from 'react';
import {render} from 'react-dom';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';

class Community extends React.Component {

	constructor(props) {
	
    super(props);
    this.state = {
      
    };

  }

  componentDidUpdate(){

  }

  render () {
  	
    return(
    	<div id="community">
    		<Navbar communities="active" location={this.props.location.pathname}/>
    		<Dashboard 
    		location = {this.props.location.pathname}
    		postsQueryUri = {`http://10.10.7.191:8080/posts?community_id=${this.props.match.params.communityId}`}
    		profileQueryUri = {`http://10.10.7.191:8080/communities/profile?id=${this.props.match.params.communityId}`}
    		infoCard="community-profile"/>
    	</div>
    	);
  }
}

export default Community;