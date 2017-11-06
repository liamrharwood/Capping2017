import React from 'react';
import Logo from '../components/Logo.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    //this.onLike = this.onLike.bind(this);
  }

  renderCommunitiesDropdown() {
    return (
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
      <a className="dropdown-item" href="#"><i className="fa fa-star mr-2" aria-hidden="true"></i>Favorite Community 1</a>
      <a className="dropdown-item" href="#"><i className="fa fa-star mr-2" aria-hidden="true"></i>Favorite Community 2</a>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" href="#">Community 3</a>
      </div>
    );
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
              
                {this.renderCommunitiesDropdown()}
              
           </li>
         </ul>
         <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
         </form>
         <ul className = "navbar-nav my-1 my-lg-0 ml-lg-4">
          <li className = {`nav-item ${this.props.profile}`}><Link to="/profile" className="nav-link"><i className="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp; Profile</Link></li>
        </ul>
         <ul className = "navbar-nav my-1 my-lg-0">
          <li className = {`nav-item ${this.props.settings}`}><Link to="/settings" className="nav-link"><i className="fa fa-cog" aria-hidden="true"></i>&nbsp; Settings</Link></li>
         </ul>
         <ul className = "navbar-nav my-1 my-lg-0">
          <li className = {`nav-item ${this.props.logOut}`}><Link to="/logout" className="nav-link"><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp; Log Out</Link></li>
         </ul>
      </div>
     </nav>
    );
  }

}

export default Navbar;
