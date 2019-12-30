import React, {Component} from 'react';

import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {colors} from '~/styles';

export default class Header extends Component {
  logOut = async () => {
    return null;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>Olá, </Text>
          <Text style={styles.name}>{this.props.user}</Text>
          <Text style={styles.title}> !</Text>
        </View>
      </View>
    );
  }
}
