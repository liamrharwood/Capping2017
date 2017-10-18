import React from 'react';
import Logo from '../components/Logo.jsx';
import 'react-bootstrap';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    //this.onLike = this.onLike.bind(this);
  }



  render() {
    return (
      <div className = "container navbar">
        <Logo />
        <div className = "col-sm-10" />
        <button className = "btn col-sm-2 login-button">Log In/Register</button>
      </div>
    );
  }

}

export default Navbar;