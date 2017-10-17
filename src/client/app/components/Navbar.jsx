import React from 'react';
import Logo from '../components/Logo.jsx';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    //this.onLike = this.onLike.bind(this);
  }



  render() {
    return (
      <div className = "navbar">
        <Logo />
      </div>
    );
  }

}

export default Navbar;