import React, {Component} from 'react';
import styled from 'styled-components';

import {Text, View, Pressable} from 'react-native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

class Home extends Component {
  render() {
    return (
      <Container>
        <Text>달공작업실</Text>
      </Container>
    );
  }
}

export default Home;
