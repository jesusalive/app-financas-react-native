import React, {Component} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import {colors} from '~/styles';

export default class Expenses extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="trending-down" size={20} color={tintColor} />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.expensesCard}>
          <Text>Expenses</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddExpense')}
          style={styles.btn}>
          <Icon name="do-not-disturb-on" size={20} color={colors.danger} />
          <Text style={styles.btnText}>Adicionar despesa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
