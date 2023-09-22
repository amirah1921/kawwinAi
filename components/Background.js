import React, { Component } from "react";
import LinearGradient from 'react-native-linear-gradient';
 // Correct import

export class Background extends Component {
  render() {
    return (
        <LinearGradient
        colors={['#101014', '#65334C', '#8247C5', '#FFE8D2']} // Fixed color format
        style={{ flex: 1 }}>
        {this.props.children}
      </LinearGradient>
    );
  }
}

export default Background;
