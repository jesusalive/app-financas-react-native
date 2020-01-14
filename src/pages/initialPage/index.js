import React, {Component} from 'react';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import {NavigationEvents} from 'react-navigation';

import styles from './styles';
import {colors} from '~/styles';

export default class InitialPage extends Component {
  goTo = page => {
    this.props.navigation.navigate(page);
  };

  addBackButtonBlock = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };

  handleBackButton() {
    return true;
  }

  removeBackButtonBlock = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.secondary}
          barStyle={'light-content'}
        />
        <NavigationEvents onDidFocus={() => this.addBackButtonBlock()} />
        <NavigationEvents onDidBlur={() => this.removeBackButtonBlock()} />
        <View style={styles.welcome}>
          <Text style={styles.title}>Se perde na hora de fazer as contas?</Text>
          <Text style={styles.description}>
            Calma, calma. Com o JMoney você controla suas finanças de forma
            facil e eficiente!
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.goTo('Login')}
            style={styles.btnSignin}>
            <Text style={styles.btnSigninText}>Ja tenho uma conta!</Text>
          </TouchableOpacity>

          <Text style={styles.or}>Ou</Text>

          <TouchableOpacity
            onPress={() => this.goTo('SignUp')}
            style={styles.btnSignup}>
            <Text style={styles.btnSignupText}>Criar uma nova conta!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
