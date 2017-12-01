import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch }
from 'react-router-dom';
import {
	PropsRoute,
	PublicRoute,
	PrivateRoute,
}
from 'react-router-with-props'
import Home from './views/home.jsx';
import Community from './views/community.jsx';
import Login from './views/login.jsx';
import User from './views/user.jsx';
import Post from './views/post.jsx';
import NotFound from './views/404.jsx';
import Settings from './views/settings.jsx';
import Profile from './views/profile.jsx';
import axios from 'axios';

class App extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
      		authed: false,
      		wrongCreds: false,
      		username: PropTypes.string,
      		token: PropTypes.string,
      		uri: "http://10.10.7.191:8080",
      		userId: PropTypes.number,
    	};

    	this.auth = this.auth.bind(this);
    	this.unauth = this.unauth.bind(this);

  	}

  	componentWillMount(){
  		if(window.sessionStorage.getItem("username") != null && window.sessionStorage.getItem("token") != null && window.sessionStorage.getItem("userId")){
  			this.setState({username: window.sessionStorage.getItem("username"), token: window.sessionStorage.getItem("token"), userId: window.sessionStorage.getItem("userId"), authed: true });
  		}
  	}

  	auth(username, password, redirect){
  		axios({
	      method:'post',
	      url: `${this.state.uri}/users/login`,
	      auth: {
	        username: username,
	        password: password,
	      },
	      data:{
	        postId: 1,
	        direction: 1,
	      },
	  })
  		.then(res => {
  			window.sessionStorage.setItem("username", username);
  			window.sessionStorage.setItem("token", res.data.token);
  			window.sessionStorage.setItem("userId", res.data.id);
  			this.setState({ authed: true, token: res.data.token, username: username, userId: res.data.id });
  			redirect();
	    }).catch((error) => {
	        if (error.response) {
	          console.log(error.response.data);
	          console.log(error.response.status);
	          console.log(error.response.headers);
	          this.setState({wrongCreds:true});
	          return;
	        }
      });
  	}

  	unauth(){
  		window.sessionStorage.clear();
  		this.setState({ authed: false, username: null, token: null, wrongCreds: false, userId: null });
  	}

  	render () {
	    return(
	    	<div>
	    		<Router>
				  <div>
				  	<Switch>
				  		<PublicRoute exact path="/login" component={Login} authed={this.state.authed} auth={this.auth} redirectTo="/home" wrongCreds={this.state.wrongCreds} uri={this.state.uri}/>
					  	<PrivateRoute exact path="/" authed={this.state.authed} redirectTo="/login" component={Home} token={this.state.token} username={this.state.username} unauth={this.unauth} uri={this.state.uri}/>
					   	<PrivateRoute exact path="/home" authed={this.state.authed} redirectTo="/login" component={Home} token={this.state.token} username={this.state.username} unauth={this.unauth} uri={this.state.uri}/>
					   	<PrivateRoute path="/communities/:communityId" authed={this.state.authed} redirectTo="/login" component={Community} token={this.state.token} username={this.state.username} unauth={this.unauth} uri={this.state.uri}/>
					   	<PrivateRoute path="/users/:userId" authed={this.state.authed} redirectTo="/login" component={User} token={this.state.token} username={this.state.username} unauth={this.unauth} uri={this.state.uri}/>
					   	<PrivateRoute path="/posts/:postId" authed={this.state.authed} redirectTo ="/login" component={Post} token={this.state.token} username={this.state.username} unauth={this.unauth}  uri={this.state.uri}/>
					   	<PrivateRoute path="/settings" authed={this.state.authed} redirectTo="/login" component={Settings} token={this.state.token} username={this.state.username} unauth={this.unauth} uri={this.state.uri} />
					   	<PrivateRoute path="/profile" authed={this.state.authed} redirectTo="/login" userId={this.state.userId} component={Profile} token={this.state.token} username={this.state.username} unauth={this.unauth}  uri={this.state.uri}/>
					   	<PropsRoute component={NotFound} />
				   	</Switch>
				  </div>
				</Router>
	    	</div>
	    	);
	}
}

export default App;