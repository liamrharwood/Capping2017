import React from 'react';
import Logo from '../components/Logo.jsx';

class MainNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    //this.onLike = this.onLike.bind(this);
  }



  render() {
    return (
     <nav className="navbar navbar-expand-lg navbar-dark nav-purple">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

       <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
           <li className="nav-item active">
            <a className="nav-link" href="#"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;Home <span className="sr-only">(current)</span></a>
           </li>
           <li className="nav-item">
            <a className="nav-link" href="#"><i className="fa fa-exclamation" aria-hidden="true"></i>&nbsp;&nbsp;Notifications</a>
           </li>
           <li className="nav-item dropdown">
             <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Your Communities
             </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#"><i className="fa fa-star mr-2" aria-hidden="true"></i>Favorite Community 1</a>
                <a className="dropdown-item" href="#"><i className="fa fa-star mr-2" aria-hidden="true"></i>Favorite Community 2</a>
              <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Community 3</a>
              </div>
           </li>
         </ul>
         <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
         </form>
         <ul className = "navbar-nav my-1 my-lg-0 ml-lg-4">
          <li className = "nav-item"><a className="nav-link" href="#"><i className="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp; Profile</a></li>
        </ul>
         <ul className = "navbar-nav my-1 my-lg-0">
          <li className = "nav-item"><a className="nav-link" href="#"><i className="fa fa-cog" aria-hidden="true"></i>&nbsp; Settings</a></li>
         </ul>
         <ul className = "navbar-nav my-1 my-lg-0">
          <li className = "nav-item"><a className="nav-link" href="#"><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp; Log Out</a></li>
         </ul>
      </div>
     </nav>
    );
  }

}

export default MainNavbar;
