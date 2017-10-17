import React from 'react';

class Logo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    //this.onLike = this.onLike.bind(this);
  }

  render() {
    return (
      <div className = "logo">
        <img src= "../images/large-logo.png" />
      </div>
    );
  }

}

export default Logo;