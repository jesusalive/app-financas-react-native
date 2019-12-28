import React, {Component} from 'react';

import {View, Text, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {colors} from '~/styles';

export default class Password extends Component {
  state = {
    pass: '',
    err: '',
  };

  navigateToNext = async () => {
    const {pass} = this.state;
    await schema
      .validate({userPass: pass.trimStart().trimEnd()})
      .then(() => {
        AsyncStorage.setItem('@Sign/Password', pass.trimStart().trimEnd());
        this.props.navigation.navigate('FinishSign');
      })
      .catch(error => this.setState({err: error.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.secondary} />
        <View>
          <Text style={styles.title}>Escolha uma senha</Text>
          <Text style={styles.description}>
            A senha deve ter no mínimo 6 caracteres
          </Text>
          <TextInput
            autoCompleteType="password"
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus={true}
            onChangeText={text => this.setState({pass: text})}
            style={styles.input}
            textContentType="newPassword"
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
  userPass: yup
    .string()
    .required('Escolha uma senha!')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .notOneOf(
      ['admin', 'administrador', 'administrator'],
      'Essa senha não é permitida',
    )
    .max(30, 'Sua senha deve ter no maximo 30 caracteres'),
});
