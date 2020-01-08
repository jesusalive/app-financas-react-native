import React, {Component} from 'react';

import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
//id, reason, value, date

export default class ExpenseItem extends Component {
  state = {
    loading: false,
    status: this.props.status,
    isModalVisible: false,
  };

  payExpense = async () => {
    this.setState({loading: true});
    const userId = await AsyncStorage.getItem('@UserId');
    const token = await AsyncStorage.getItem('@UserToken');
    await api
      .put(
        `/outs/${this.props.id}/status`,
        {userId, status: 'paid'},
        {headers: {Authorization: token}},
      )
      .then(async () => {
        this.setState({
          loading: false,
          status: 'paid',
        });

        this.toogleModal();
        await AsyncStorage.setItem('@RefreshDashboard', 'true');
      });
  };

  toogleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn="pulse"
          animationOut="pulse"
          backdropColor={colors.darkTransparent}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Definir esta despesa como paga?
              </Text>
              <View style={styles.modalBtns}>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => this.payExpense()}>
                  {this.state.loading ? (
                    <ActivityIndicator size="small" color={colors.lighter} />
                  ) : (
                    <Text style={styles.modalBtnText}>Sim!</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCancelBtn}
                  onPress={() => this.toogleModal()}>
                  <Text style={styles.modalBtnText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
            {this.state.status == 'pending' ? (
              <TouchableOpacity
                onPress={() => this.toogleModal()}
                style={styles.pendingExpense}>
                <Text style={styles.statusText}>Pagamento pendente</Text>
              </TouchableOpacity>
            ) : this.state.status == 'paid' ? (
              <TouchableOpacity style={styles.paidExpense}>
                <Text style={styles.statusText}>Despesa paga!</Text>
              </TouchableOpacity>
            ) : (
              this.state.status == 'expired' && (
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
