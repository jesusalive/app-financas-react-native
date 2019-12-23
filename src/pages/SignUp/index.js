import React, {Component} from 'react';

import {View, Text, StatusBar, TouchableOpacity} from 'react-native';

import styles from './styles';
import {colors} from '~/styles';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <View>
          <Text style={styles.title}> Cadastre-se </Text>
        </View>
      </View>
    );
  }
}
