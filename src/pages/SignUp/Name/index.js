import React, {Component} from 'react';

import {View, Text, StatusBar, TouchableOpacity} from 'react-native';

import styles from './styles';
import {colors} from '~/styles';

export default class Name extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
      </View>
    );
  }
}
