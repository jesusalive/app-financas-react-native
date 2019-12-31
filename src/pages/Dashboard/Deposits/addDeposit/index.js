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
import CheckBox from '@react-native-community/checkbox';
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
            onContentSizeChange={this._onContentSizeChange}
            multiline
            autoCorrect={false}
            autoCapitalize="words"
            placeholder="Qual o motivo da entrada?"
            placeholderTextColor={colors.white}
            style={styles.input}
          />
          <TextInput
            onContentSizeChange={this._onContentSizeChange}
            multiline
            keyboardType="decimal-pad"
            placeholder="Qual o valor?"
            style={styles.input}
            placeholderTextColor={colors.white}
            onChange={text => {
              console.tron.log(this.state.value);
              this.setState({value: text});
            }}>
            {this.state.value > 0 && <Text>R$ {this.state.value}</Text>}
          </TextInput>
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
                console.tron.log(fixed);
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

          <TouchableOpacity onPress={() => {}} style={styles.saveBtn}>
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
