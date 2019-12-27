import React, {Component} from 'react';

import {View, Text, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';
import {colors} from '~/styles';

export default class Surname extends Component {
  state = {
    surname: '',
    err: '',
  };

  navigateToNext = async () => {
    const {surname} = this.state;
    await schema
      .validate({surnameUser: surname.trimStart()})
      .then(() => {
        AsyncStorage.setItem('@Sign/Surname', surname);
        this.props.navigation.navigate('Email');
      })
      .catch(error => this.setState({err: error.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.secondary} />
        <View>
          <Text style={styles.title}>Qual seu último nome?</Text>
          <TextInput
            autoCompleteType="name"
            autoCorrect={false}
            autoCapitalize="sentences"
            autoFocus={true}
            onChangeText={text => this.setState({surname: text})}
            placeholder="Exemplo: Silva/Oliveira"
            style={styles.input}
            textContentType="name"
          />
        </View>
        {this.state.err != '' && (
          <Text style={styles.error}>{this.state.err}</Text>
        )}
        <TouchableOpacity
          onPress={() => this.navigateToNext()}
          style={styles.btn}>
          <Icon name="arrow-circle-right" size={45} color={colors.white} />
        </TouchableOpacity>
      </View>
    );
  }
}

const schema = yup.object().shape({
  surnameUser: yup
    .string()
    .required('Informe seu sobrenome!')
    .min(3, 'O sobrenome deve ter no mínimo 3 letras')
    .notOneOf(
      ['admin', 'administrador', 'administrator'],
      'Esse sobrenome não é permitido',
    )
    .max(100, 'Seu nome deve ter no maximo 20 letras'),
});
