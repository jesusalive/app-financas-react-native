import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {format, subDays, parseISO} from 'date-fns';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import Notification from 'react-native-push-notification';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInputMask} from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Fontisto';

import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';

export default class addFixedExpense extends Component {
  state = {
    reason: '',
    value: 0,
    date: new Date(),
    showDatePicker: false,
    datePickerMode: 'date',
    validateErr: '',
    isModalVisible: false,
    loading: false,
  };

  toogleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  adjustValue = text => {
    return String(text)
      .trimEnd()
      .trimStart()
      .replace('R$ ', '')
      .replace('.', '')
      .replace(',', '.');
  };

  validateFields = async () => {
    this.setState({loading: true});
    const {reason, value} = this.state;
    await schema
      .validate({
        reasonInput: reason.trimEnd().trimEnd(),
        valueInput: this.adjustValue(value),
      })
      .then(() => {
        this.registerExpense();
      })
      .catch(err => this.setState({loading: false, validateErr: err.message}));
  };

  registerExpense = async () => {
    const {date, reason, value} = this.state;
    const adjustedReason = reason.trimEnd().trimStart();
    const adjustedDate = format(date, 'yyyy-MM-dd');
    const adjustedValue = this.adjustValue(value);
    const user = await AsyncStorage.getItem('@UserId');
    const token = await AsyncStorage.getItem('@UserToken');

    const expense = {
      userId: parseInt(user),
      reason: adjustedReason,
      value: parseFloat(adjustedValue),
      date: adjustedDate,
    };

    await api
      .post('/fixedouts', expense, {headers: {Authorization: token}})
      .then(response => {
        this.scheduleNotification(response.data.id, adjustedDate);
        this.setState({loading: false});
        this.toogleModal();
      });
  };

  scheduleNotification = async (expenseId, expirationDate) => {
    const user = await AsyncStorage.getItem('@UserId');
    const {reason} = this.state;
    const adjustedDate = subDays(parseISO(expirationDate), 2);

    Notification.localNotificationSchedule({
      id: user + expenseId,
      userInfo: {id: user + expenseId},
      title: 'Despesa prestes a vencer',
      message: `Sua despesa fixa ${reason} está para vencer, não esqueça de pagar!`,
      date: adjustedDate,
      repeatType: 'month',
    });
  };

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      showDatePicker: Platform.OS === 'ios' ? true : false,
      date,
    });
  };

  show = datePickerMode => {
    this.setState({
      showDatePicker: true,
      datePickerMode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  render() {
    const {showDatePicker, date, datePickerMode} = this.state;
    const year = date.getFullYear();
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={colors.danger}
            barStyle={'light-content'}
          />
          <Modal animationIn="pulse" isVisible={this.state.isModalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Despesa registrada com sucesso!
                </Text>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() =>
                    this.props.navigation.navigate('FixedExpenses')
                  }>
                  <Text style={styles.modalBtnText}>Concluir!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.closeButton}>
            <CloseIcon name="closecircle" size={25} color={colors.white} />
          </TouchableOpacity>

          <View>
            <Text style={styles.fixedText}> Adicionar Despesa Fixa </Text>
            <Text style={styles.fixedDescription}>
              Todos os meses lembraremos você dela e ao marcá-la como paga
              automaticamente sera colocada nas suas despesas mensais.
            </Text>
          </View>

          <View>
            <TextInput
              value={this.state.reason}
              autoCorrect={false}
              autoCapitalize="words"
              placeholder="Qual o motivo da despesa?"
              placeholderTextColor={colors.white}
              style={styles.input}
              onChangeText={text => this.setState({reason: text})}
            />

            <TextInputMask
              value={this.state.value}
              type="money"
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$ ',
              }}
              style={styles.input}
              onChangeText={text => {
                this.setState({value: text});
              }}
            />

            <TouchableOpacity
              onPress={() => this.datepicker()}
              style={styles.dateBtn}>
              <Icon name="date" size={20} color={colors.white} />
              <Text style={styles.textBtn}>
                {format(this.state.date, 'dd/MM/yyyy')} {'\n'}
                <Text style={styles.textDate}>
                  Clique para selecionar outra data
                </Text>
              </Text>
            </TouchableOpacity>

            {this.state.validateErr != '' && (
              <Text style={styles.error}>{this.state.validateErr}</Text>
            )}

            <TouchableOpacity
              onPress={() => this.validateFields()}
              style={styles.saveBtn}>
              {this.state.loading ? (
                <ActivityIndicator size="small" color={colors.danger} />
              ) : (
                <Text style={styles.saveText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>

          <View />
          {showDatePicker && (
            <DateTimePicker
              minimumDate={new Date(year, 0, 1)}
              value={date}
              mode={datePickerMode}
              is24Hour={true}
              display="calendar"
              onChange={this.setDate}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const schema = yup.object().shape({
  reasonInput: yup
    .string('Digite um motivo válido')
    .required('Digite um motivo válido')
    .min(3, 'O motivo deve ter no mínimo 3 caracteres')
    .max(20, 'O motivo deve ter até 20 caracteres'),

  valueInput: yup
    .number('Insira um valor válido')
    .required('Insira um valor válido')
    .min(0)
    .positive('O valor não pode ser negativo'),
});
