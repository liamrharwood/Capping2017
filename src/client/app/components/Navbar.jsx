import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../components/Logo.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: PropTypes.Array,
    };
  }

  componentDidMount(){
    this.fetchCommunities();
  }

  fetchCommunities(){

    axios({
      method:'get',
      url: 'http://10.10.7.191:8080/communities',
      auth: {
        username: 'user1',
        password: 'password'
      },
      responseType: 'json',
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

  renderCommunitiesDropdown() {

    if(this.state.data && this.state.data.length > 0){
      return (
        this.state.data.map(this.renderCommunityOption)
      );
    } else if (this.state.data){
        return (<a className="dropdown-item" >You do not follow any communities.</a>);
    } else {
      return (<a className="dropdown-item" >Loading Communities...</a>)
    }
  }
  
  renderCommunityOption(data) {
    return(<Link to={`/communities/${data.communityId}`} key={data.communityId} className="dropdown-item">{data.name}</Link>)
  }



  render() {
    return (
     <nav className="navbar navbar-expand-lg navbar-dark nav-purple position-fixed">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

       <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
           <li className= {`nav-item ${this.props.home}`}>
            <Link to="/home" className="nav-link"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;Home</Link>
           </li>
           <li className={`nav-item ${this.props.notifications}`}>
            <Link to="/notifications" className="nav-link"><i className="fa fa-exclamation" aria-hidden="true"></i>&nbsp;&nbsp;Notifications</Link>
           </li>
           <li className={`nav-item dropdown ${this.props.communities}`}>
             <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Your Communities
             </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {this.renderCommunitiesDropdown()}
                </div>
           </li>
         </ul>
         <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
         </form>
         <ul className = "navbar-nav my-1 my-lg-0 ml-lg-4">
          <li className = {`nav-item ${this.props.profile}`}><Link to="/users/4" className="nav-link"><i className="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp; Profile</Link></li>
        </ul>
         <ul className = "navbar-nav my-1 my-lg-0">
          <li className = {`nav-item ${this.props.settings}`}><Link to="/settings" className="nav-link"><i className="fa fa-cog" aria-hidden="true"></i>&nbsp; Settings</Link></li>
         </ul>
         <ul className = "navbar-nav my-1 my-lg-0">
          <li className = {`nav-item ${this.props.logOut}`}><Link to="/login" onClick={this.props.unauth} className="nav-link"><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp; Log Out</Link></li>
         </ul>
      </div>
     </nav>
    );
  }

}

export default Navbar;
