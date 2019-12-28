import React, {Component} from 'react';

import {View, Text, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {colors} from '~/styles';

export default class Name extends Component {
  state = {
    name: '',
    err: '',
  };

  navigateToNext = async () => {
    const {name} = this.state;
    await schema
      .validate({nameUser: name.trimStart().trimEnd()})
      .then(() => {
        AsyncStorage.setItem('@Sign/Name', name.trimStart().trimEnd());
        this.props.navigation.navigate('Surname');
      })
      .catch(error => this.setState({err: error.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.secondary} />
        <View>
          <Text style={styles.title}>Qual seu primeiro nome?</Text>
          <TextInput
            autoCompleteType="name"
            autoCorrect={false}
            autoCapitalize="sentences"
            autoFocus={true}
            onChangeText={text => this.setState({name: text})}
            placeholder="Exemplo: Fernando"
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
  nameUser: yup
    .string()
    .required('Informe seu nome!')
    .min(3, 'O nome deve ter no mínimo 3 letras')
    .notOneOf(
      ['admin', 'administrador', 'administrator'],
      'Esse nome não é permitido',
    )
    .max(20, 'Seu nome deve ter no maximo 20 letras'),
});
