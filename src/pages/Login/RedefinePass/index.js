import React, {Component} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Lottie from 'lottie-react-native';

import styles from './styles';
import {colors} from '~/styles';

import Loading01 from '~/pages/Loadings/Loading01';

import animation from '~/styles/animations/972-done.json';
import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class RedefinePass extends Component {
  state = {
    newPass: '',
    err: '',
    loading: false,
  };

  getNewPass = async () => {
    this.setState({loading: true});
    const username = await AsyncStorage.getItem('@RecoverUser');
    await api
      .post('/new_pass', {
        username,
        pass: '23192128',
      })
      .then(async response => {
        this.setState({newPass: response.data.pass, loading: false});
        await AsyncStorage.clear();
      })
      .catch(() => {
        NetInfo.fetch().then(conectionResponse => {
          if (!conectionResponse.isConnected) {
            this.setState({
              err: 'Sem conexão com a internet! \n Tente novamente mais tarde',
              loading: false,
            });
          } else {
            this.setState({
              err: 'Houve um erro inexperado! \n Tente novamente mais tarde',
              loading: false,
            });
          }
        });
      });
  };

  componentDidMount() {
    this.getNewPass();
  }

  render() {
    return this.state.loading ? (
      <ActivityIndicator size="large" color={colors.whiteTransparent} />
    ) : this.state.err != '' ? (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.secondary}
          barStyle="light-content"
        />
        <Text style={styles.error}>{this.state.err}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.checkButton}>
          <Text style={styles.textBtn}>Ir para a tela de login</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.secondary}
          barStyle="light-content"
        />
        <SafeAreaView>
          <Lottie
            autoPlay
            autoSize
            loop={false}
            resizeMode="contain"
            source={animation}
          />
        </SafeAreaView>
        <Text style={styles.title}>Sua nova senha é:</Text>
        <Text style={styles.pass}> {this.state.newPass} </Text>
        <Text style={styles.description}>
          Sua senha foi alterada com sucesso! Agora você pode logar usando-a e
          depois quando ja estiver dentro do app alterá-la para outra de sua
          preferência
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.checkButton}>
          <Text style={styles.textBtn}>Ir para a tela de login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
