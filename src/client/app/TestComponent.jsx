import React from 'react';

class TestComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

  render() {
    return (
      <div>
        Prayers : <span>{this.state.likesCount}</span>
        <div><button onClick={this.onLike}>Pray</button></div>
      </div>
    );
  }

}

export default TestComponent;