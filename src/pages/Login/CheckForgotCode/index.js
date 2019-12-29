import React, {Component} from 'react';

import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import {colors} from '~/styles';

export default class CheckForgotCode extends Component {
  static navigationOptions = {
    title: 'Recuperar minha senha',
    headerStyle: {
      backgroundColor: colors.secondary,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 15,
    },
  };

  state = {
    code: '',
    loading: false,
    error: '',
  };

  verifyCode = async () => {
    this.setState({loading: true});
    const correctCode = await AsyncStorage.getItem('@RecoverCode');
    const {code} = this.state;

    if (code == correctCode) {
      this.setState({loading: false});
      this.props.navigation.navigate('RedefinePassword');
    } else {
      this.setState({error: 'Código incorreto', loading: false});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.secondary} />
        <Text style={styles.title}>Insira abaixo o código de redefinição</Text>
        <Text style={styles.description}>
          Foi enviado um codigo de redefinição de senha no email cadastrado no
          username que você digitou. Acesse esse email e coloque o codigo no
          campo abaixo para continuar
        </Text>
        <TextInput
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          onChangeText={text => this.setState({code: text})}
          style={styles.usernameInput}
          textContentType="oneTimeCode"
          placeholder="Seu código..."
          placeholderTextColor={colors.darkTransparent}
        />
        {this.state.error != '' && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
        <TouchableOpacity
          onPress={() => this.verifyCode()}
          style={styles.checkButton}>
          {!this.state.loading ? (
            <Text style={styles.textLogin}>Enviar</Text>
          ) : (
            <ActivityIndicator size="small" color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
