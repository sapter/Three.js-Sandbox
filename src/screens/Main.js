import React, { Component } from 'react';
import ThreeJSCanvas from '../components/ThreeJSCanvas';

class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <ThreeJSCanvas />
      </div>
    );
  }
}

export default Main;
