import React, {Component} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import {colors} from '~/styles';

export default class Deposits extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="hand-holding-usd" size={20} color={tintColor} />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.depositsCard}>
          <Text>Deposits</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddDeposit')}
          style={styles.btn}>
          <Icon name="plus-circle" size={20} color={colors.success} />
          <Text style={styles.btnText}>Adicionar entrada</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
