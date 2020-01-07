import React, {Component} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import styles from './styles';
import {colors} from '~/styles';
//id, reason, value, date

export default class ExpenseItem extends Component {
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
          <View style={styles.descriptionItem}>
            {this.props.status == 'pending' ? (
              <TouchableOpacity style={styles.pendingExpense}>
                <Text style={styles.statusText}>Pagamento pendente</Text>
              </TouchableOpacity>
            ) : this.props.status == 'paid' ? (
              <TouchableOpacity style={styles.paidExpense}>
                <Text style={styles.statusText}>Despesa paga!</Text>
              </TouchableOpacity>
            ) : (
              this.props.status == 'expired' && (
                <TouchableOpacity style={styles.expiredExpense}>
                  <Text style={styles.statusText}>Despesa paga!</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </View>
    );
  }
}
