import React, {Component} from 'react';

import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Fontisto';
import CloseIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';
//id, reason, value, date

export default class FixedDepositItem extends Component {
  state = {
    modalIsVisible: false,
    loading: false,
    removed: false,
  };

  toogleModal = () =>
    this.setState({modalIsVisible: !this.state.modalIsVisible});

  removeFixedDeposit = async () => {
    this.setState({loading: true});
    const userId = await AsyncStorage.getItem('@UserId');
    const token = await AsyncStorage.getItem('@UserToken');
    await api
      .put(
        `/deposits/${this.props.id}/fixed`,
        {userId, fixed: false},
        {headers: {Authorization: token}},
      )
      .then(() => {
        this.setState({
          loading: false,
          modalIsVisible: false,
          removed: true,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.blockItem}>
          <Text style={styles.title}>{this.props.title}</Text>
          {this.state.removed && (
            <Text style={styles.removedItem}>
              Item removido {'\n'} Atualize sua lista arrastando para baixo!
            </Text>
          )}
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
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => this.toogleModal()}>
              <CloseIcon name="closecircle" color={colors.danger} size={10} />
              <Text style={styles.remove}>Remover receita fixa</Text>
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
              <Text style={styles.modalTitle}>
                Definir esta receita como não mensal?
              </Text>
              <View style={styles.modalBtns}>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => this.removeFixedDeposit()}>
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
      </View>
    );
  }
}
