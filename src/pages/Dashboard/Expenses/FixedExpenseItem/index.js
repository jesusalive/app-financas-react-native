import React, {Component} from 'react';

import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import Notification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/Fontisto';
import CloseIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';
import {format} from 'date-fns';
//id, reason, value, date

export default class FixedExpenseItem extends Component {
  state = {
    modalIsVisible: false,
    paymentModalIsVisible: false,
    loading: false,
    removed: false,
    date: new Date(),
    err: '',
    status: '',
  };

  componentDidMount() {
    this.verifyExpenseStatus();
  }

  toogleModal = () =>
    this.setState({modalIsVisible: !this.state.modalIsVisible});

  tooglePaymentModal = () =>
    this.setState({paymentModalIsVisible: !this.state.paymentModalIsVisible});

  verifyExpenseStatus = async () => {
    const today = format(new Date(), 'dd');
    const expirationDay = this.props.date;

    return this.props.status != 'paid' &&
      parseInt(today) > parseInt(expirationDay)
      ? this.setState({status: 'expired'})
      : this.setState({status: this.props.status});
  };

  payFixedExpense = async () => {
    this.setState({loading: true});
    const {date} = this.state;
    const userId = await AsyncStorage.getItem('@UserId');
    const token = await AsyncStorage.getItem('@UserToken');
    const adjustedDate = format(date, 'yyyy-MM-dd');

    await api
      .put(
        `/fixedouts/${this.props.id}`,
        {userId, lastPayment: adjustedDate, status: 'paid'},
        {headers: {Authorization: token}},
      )
      .then(async () => {
        await this.registerExpense();
      });
  };

  registerExpense = async () => {
    const adjustedDate = format(new Date(), 'yyyy-MM-dd');
    const adjustedValue = this.adjustValue(this.props.value);
    const user = await AsyncStorage.getItem('@UserId');
    const token = await AsyncStorage.getItem('@UserToken');

    const expense = {
      userId: parseInt(user),
      reason: this.props.title,
      value: parseFloat(adjustedValue),
      date: adjustedDate,
    };

    await api
      .post('/outs', expense, {headers: {Authorization: token}})
      .then(async () => {
        await AsyncStorage.setItem('@RefreshDashboard', 'true');
        this.tooglePaymentModal();
        this.setState({status: 'paid', loading: false});
      });
  };

  adjustValue = text => {
    return String(text)
      .trimEnd()
      .trimStart()
      .replace('R$ ', '')
      .replace('.', '')
      .replace(',', '.');
  };

  removeFixedExpense = async () => {
    this.setState({loading: true});
    const userId = await AsyncStorage.getItem('@UserId');
    const token = await AsyncStorage.getItem('@UserToken');
    await api
      .delete(`/fixedouts/${userId}/${this.props.id}`, {
        headers: {Authorization: token},
      })
      .then(() => {
        Notification.cancelLocalNotifications({id: userId + this.props.id});
        this.setState({
          loading: false,
          modalIsVisible: false,
          removed: true,
          status: 'Item removido \n Atualize a lista arrastando para baixo!',
        });
      })
      .catch(() =>
        this.setState({
          err:
            'Houve um erro inexperado, tente novamente mais tarde! Clique em cancelar',
        }),
      );
  };

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
          <View style={styles.btnsBlock}>
            {this.state.status == 'pending' ? (
              <TouchableOpacity
                style={styles.statusBtn}
                onPress={() => this.tooglePaymentModal()}>
                <Text style={styles.pending}>Pagameno pendente</Text>
              </TouchableOpacity>
            ) : this.state.status == 'paid' ? (
              <TouchableOpacity style={styles.statusBtn} onPress={() => {}}>
                <Text style={styles.paid}>Despesa paga</Text>
              </TouchableOpacity>
            ) : this.state.status == 'expired' ? (
              <TouchableOpacity
                style={styles.statusBtn}
                onPress={() => this.tooglePaymentModal()}>
                <Text style={styles.expired}>Despesa Vencida</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.statusBtn} onPress={() => {}}>
                <Text style={styles.removedItem}>{this.state.status}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => (this.state.removed ? {} : this.toogleModal())}>
              <CloseIcon name="closecircle" color={colors.danger} size={10} />
              <Text style={styles.remove}>Remover despesa fixa</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={this.state.modalIsVisible}
          animationIn="pulse"
          animationOut="pulse"
          backdropColor={colors.darkTransparent}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Apagar despesa Fixa?</Text>
              <View style={styles.modalBtns}>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => this.removeFixedExpense()}>
                  {this.state.loading ? (
                    <ActivityIndicator size="small" color={colors.lighter} />
                  ) : (
                    <Text style={styles.modalBtnText}>Concluir!</Text>
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
        <Modal
          isVisible={this.state.paymentModalIsVisible}
          animationIn="pulse"
          animationOut="pulse"
          backdropColor={colors.darkTransparent}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Deseja marcar essa despesa como paga?'
              </Text>
              <View style={styles.modalBtns}>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => this.payFixedExpense()}>
                  {this.state.loading ? (
                    <ActivityIndicator size="small" color={colors.lighter} />
                  ) : (
                    <Text style={styles.modalBtnText}>Concluir!</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCancelBtn}
                  onPress={() => this.tooglePaymentModal()}>
                  <Text style={styles.modalBtnText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
