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
import {format} from 'date-fns';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import {TextInputMask} from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Fontisto';

import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';

export default class addExpense extends Component {
  state = {
    reason: '',
    value: 0,
    date: new Date(),
    fixed: false,
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
    const {date, reason, fixed, value} = this.state;
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
      fixed,
    };

    await api
      .post('/outs', expense, {headers: {Authorization: token}})
      .then(response => {
        this.setState({loading: false});
        this.toogleModal();
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
    const {showDatePicker, date, datePickerMode, fixed} = this.state;
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
                  onPress={() => this.props.navigation.navigate('Despesas')}>
                  <Text style={styles.modalBtnText}>Concluir!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Despesas')}
            style={styles.closeButton}>
            <CloseIcon name="closecircle" size={25} color={colors.white} />
          </TouchableOpacity>

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

          <View style={styles.checkView}>
            <CheckBox
              disabled={false}
              value={fixed}
              onValueChange={value => {
                this.setState({fixed: value});
              }}
              tintColors={{
                true: colors.white,
                false: colors.whiteTransparent,
              }}
            />
            <Text style={styles.fixedText}>Definir despesa como fixa </Text>
          </View>
          <Text style={styles.fixedDescription}>
            (Colocaremos todos os meses automaticamete para você)
          </Text>

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
