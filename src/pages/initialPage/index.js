import React, {Component} from 'react';

import {
  View,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Lottie from 'lottie-react-native';
import animation from '~/styles/animations/initialPageAnimation.json';

import styles from './styles';
import {colors} from '~/styles';

export default class InitialPage extends Component {
  goTo = page => {
    this.props.navigation.navigate(page);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.secondary}
          barStyle={'light-content'}
        />
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
