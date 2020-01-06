import React, {Component} from 'react';

import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import styles from './styles';
import {colors} from '~/styles';
//id, reason, value, date

export default class DepositItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.blockItem}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.blockDescription}>
          <View style={styles.descriptionItem}>
            <Icon name="date" size={10} color={colors.lighter} />
            <Text style={styles.descriptionText}> Dia {this.props.date}</Text>
          </View>
          <View style={styles.descriptionItem}>
            <Text style={styles.descriptionText}> Valor: R$ </Text>
            <Text style={styles.descriptionText}>{this.props.value}</Text>
          </View>
        </View>
      </View>
    );
  }
}
