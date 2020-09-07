import React, { Component } from 'react';

class NewSoup extends Component {
  render() {
    return (
      <div>
        <h1>New Supervision</h1>
        <div>{this.props.match.params.id}</div>
      </div>
    );
  }
}
export default NewSoup;
