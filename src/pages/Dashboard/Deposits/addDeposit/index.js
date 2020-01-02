import React, {Component} from 'react';

import {
  View,
  Text,
  TextInput,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {format} from 'date-fns';
import {TextInputMask} from 'react-native-masked-text';
import CheckBox from '@react-native-community/checkbox';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Fontisto';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import {colors} from '~/styles';

export default class addDeposit extends Component {
  state = {
    //FIXED PRECISA SER INVERTIDO
    reason: '',
    value: 0,
    date: new Date(),
    showDatePicker: false,
    datePickerMode: 'date',
    fixed: false,
    validateErr: '',
  };

  adjustValue = text => {
    return String(text)
      .trimEnd()
      .trimStart()
      .replace('R$ ', '')
      .replace(',', '.');
  };

  validateFields = async () => {
    const {reason, value} = this.state;
    await schema
      .validate({
        reasonInput: reason,
        valueInput: this.adjustValue(value),
      })
      .catch(err => this.setState({validateErr: err.message}));
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
            backgroundColor={colors.success}
            barStyle={'light-content'}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Entradas')}
            style={styles.closeButton}>
            <CloseIcon name="closecircle" size={25} color={colors.white} />
          </TouchableOpacity>

          <TextInput
            value={this.state.reason}
            autoCorrect={false}
            autoCapitalize="words"
            placeholder="Qual o motivo da entrada?"
            placeholderTextColor={colors.white}
            style={styles.input}
            onChangeText={text =>
              this.setState({reason: text.trimStart().trimEnd()})
            }
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
            <Text style={styles.fixedText}>Definir receita como fixa </Text>
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
            <Text style={styles.saveText}>Salvar</Text>
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
