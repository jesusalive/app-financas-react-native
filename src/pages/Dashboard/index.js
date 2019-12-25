import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {View, Text} from 'react-native';

import styles from './styles';

export default class Dashboard extends Component {
  state = {
    user: '',
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const name = await AsyncStorage.getItem('@User');
    this.setState({user: name});
  };

  render() {
    return (
      <View>
        <Text>Seja bem-vindo, {this.state.user}</Text>
      </View>
    );
  }
}
