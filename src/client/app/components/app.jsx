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
	PrivateRoute }
from 'react-router-with-props'
import Home from './views/home.jsx';
import Community from './views/community.jsx';
import Login from './views/login.jsx';
import User from './views/user.jsx';
import Post from './views/post.jsx';
import NotFound from './views/404.jsx';
import Settings from './views/settings.jsx';
import Profile from './views/profile.jsx';
import Report from './views/report.jsx';
import CommunityCreator from './views/communityCreator.jsx';
import Search from './views/search.jsx';
import axios from 'axios';

/**
*TODO
*
*/
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authed: false,                  //TODO
			wrongCreds: false,              //TODO
			username: PropTypes.string,     //TODO
			token: PropTypes.string,        //TODO
			uri: "http://10.10.7.191:8080", //TODO
		//    uri: "https://35.190.132.190:22",
			userId: PropTypes.number,       //TODO
			rememberMe: false,
		};
		this.auth = this.auth.bind(this);
		this.unauth = this.unauth.bind(this);
		this.checkAuth = this.checkAuth.bind(this);

	}

	/**
	*TODO
	*
	*/
	componentWillMount(){
		if(window.sessionStorage.getItem("username") && 
		   window.sessionStorage.getItem("token") && 
		   window.sessionStorage.getItem("userId") &&
		   window.sessionStorage.getItem("rememberMe")){
			this.setState({
				username: window.sessionStorage.getItem("username"), 
				token: window.sessionStorage.getItem("token"), 
				userId: window.sessionStorage.getItem("userId"), 
				rememberMe: window.sessionStorage.getItem("rememberMe"),
				authed: true,
			});
		}
	}

	/**
	*TODO
	*
	*@param {} username - 
	*@param {} password - 
	*@param {} redirect - 
	*/
	auth(username, password, rememberMe, redirect){
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
		}).then(res => {
			window.sessionStorage.setItem("username", username);
			window.sessionStorage.setItem("token", res.data.token);
			window.sessionStorage.setItem("userId", res.data.id);
			window.sessionStorage.setItem("rememberMe", rememberMe);
			this.setState({ 
				authed: true, 
				token: res.data.token, 
				username: username, 
				userId: res.data.id,
				rememberMe: rememberMe,
			});
			redirect();
		}).catch((error) => {
			if (error.response) {
				this.setState({wrongCreds:true});
				return;
			}
		});
	}

	checkAuth(){
		if(this.state.authed){

		} else {
			return false;
		}
	}

	/**
	*TODO
	*
	*/
	unauth(){
		window.sessionStorage.clear();
		this.setState({ 
			authed: false, 
			username: null, 
			token: null, 
			wrongCreds: false, 
			userId: null,
			rememberMe: false,
		});
	}

	/**
	*TODO
	*
	*@return {} - 
	*/
	render () {
		return(
			<div>
				<Router>
				  <div>
					<Switch>
						<PublicRoute 
							exact path="/login" 
							component={Login} authed={this.state.authed} 
							auth={this.auth} redirectTo="/home" 
							wrongCreds={this.state.wrongCreds} 
							uri={this.state.uri}
						/>
						<PrivateRoute 
							exact path="/" 
							authed={this.state.authed} 
							redirectTo="/login" 
							component={Home} 
							token={this.state.token} 
							username={this.state.username} 
							unauth={this.unauth} 
							uri={this.state.uri}
						/>
						<PrivateRoute 
							exact path="/home" 
							authed={this.state.authed} 
							redirectTo="/login" 
							component={Home} 
							token={this.state.token} 
							username={this.state.username} 
							unauth={this.unauth} 
							uri={this.state.uri}
						/>
						<PrivateRoute 
							exact path="/communities/create" 
							authed={this.state.authed} 
							redirectTo="/login" 
							userId={this.state.userId} 
							component={CommunityCreator} 
							token={this.state.token} 
							username={this.state.username} 
							unauth={this.unauth}  
							uri={this.state.uri}
						/>
						<PrivateRoute 
							path="/communities/:communityId" 
							authed={this.state.authed} 
							redirectTo="/login" 
							component={Community} 
							token={this.state.token} 
							username={this.state.username} 
							unauth={this.unauth} 
							uri={this.state.uri}
						/>
						<PrivateRoute 
							path="/users/:userId" 
							authed={this.state.authed} 
							redirectTo="/login" 
							component={User} 
							token={this.state.token}
							username={this.state.username} 
							unauth={this.unauth} 
							uri={this.state.uri}
						/>
						<PrivateRoute 
							path="/posts/:postId" 
							authed={this.state.authed} 
							redirectTo ="/login" 
							component={Post} 
							token={this.state.token} 
							username={this.state.username} 
							unauth={this.unauth}  
							uri={this.state.uri}
						/>
						<PrivateRoute 
							path="/settings" 
							authed={this.state.authed} 
							redirectTo="/login" 
							component={Settings} 
							token={this.state.token} 
							username={this.state.username} 
							unauth={this.unauth} 
							uri={this.state.uri} 
						/>
						<PrivateRoute 
							path="/report/:postId" 
							authed={this.state.authed} 
							redirectTo="/login" 
							component={Report} 
							token={this.state.token} 
							username={this.state.username} 
							unauth={this.unauth} 
							uri={this.state.uri} 
						/>
						<PrivateRoute 
							path="/search/:search" 
							authed={this.state.authed} 
							redirectTo="/login" 
							userId={this.state.userId} 
							component={Search} 
							token={this.state.token} 
							username={this.state.username} 
							unauth={this.unauth}  
							uri={this.state.uri}
						/>
						<PrivateRoute 
							path="/profile" 
							authed={this.state.authed} 
							redirectTo="/login" 
							userId={this.state.userId} 
							component={Profile} 
							token={this.state.token} 
							username={this.state.username} 
							unauth={this.unauth}  
							uri={this.state.uri}
						/>
						<PropsRoute component={NotFound}/>
					</Switch>
				  </div>
				</Router>
			</div>
			);
	}
}

export default App;