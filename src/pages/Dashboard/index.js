import React, {Component} from 'react';
import Notification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import LogOutIcon from 'react-native-vector-icons/AntDesign';
import Lottie from 'lottie-react-native';

import styles from './styles';
import {colors} from '~/styles';
import {format, parseISO, subDays, addMonths, isAfter} from 'date-fns';
import animation from '~/styles/animations/moneyLoading.json';
import api from '~/services/api';
import {NavigationEvents} from 'react-navigation';

export default class Dashboard extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="home" size={20} color={tintColor} />
    ),
  };

  state = {
    user: '',
    err: '',
    valueOfDeposits: 0,
    valueOfExpenses: 0,
    deposits: [],
    expenses: [],
    fixedExpenses: [],
    loading: false,
    balance: '2.500,25',
  };

  addBackButtonBlock = () => {
    BackHandler.addEventListener('hardwareBackPress', function() {
      return true;
    });
  };

  async componentDidMount() {
    this.addBackButtonBlock();
    this.getUser();
    await this.getAllDepositsValue();
    await this.getExpensesValue();
    this.calculateBalance();
  }

  calculateBalance = () => {
    const {valueOfDeposits, valueOfExpenses} = this.state;
    const balance = parseFloat(valueOfDeposits) - parseFloat(valueOfExpenses);

    this.setState({balance, loading: false});
  };

  calculateDepositsValue = () => {
    this.state.deposits.map(item =>
      this.setState({
        valueOfDeposits: this.state.valueOfDeposits + parseFloat(item.value),
      }),
    );
  };

  calculateExpensesValue = () => {
    this.state.expenses.map(item =>
      this.setState({
        valueOfExpenses: this.state.valueOfExpenses + parseFloat(item.value),
      }),
    );
  };

  adjustValue = value => {
    return parseFloat(value)
      .toFixed(2) // casas decimais
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  getAllDepositsValue = async () => {
    await this.getAllMonthDeposits();
    await this.getAllFixedDeposits();
    this.calculateDepositsValue();
  };

  getExpensesValue = async () => {
    await this.findAllMonthExpenses();
    this.calculateExpensesValue();
  };

  getAllMonthDeposits = async () => {
    this.setState({loading: true});

    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    const month = format(new Date(), 'MM');
    const year = format(new Date(), 'yyyy');

    await api
      .get(`/deposits/${user}/${month}/${year}`, {
        headers: {Authorization: token},
      })
      .then(response => {
        response.data.map(item =>
          this.setState({deposits: [...this.state.deposits, item]}),
        );
      })
      .catch(() =>
        this.setState({
          err: 'Erro ao tentar carregar os dados, tente novamente mais tarde!',
          loading: false,
          refreshing: false,
        }),
      );
  };

  getAllFixedDeposits = async () => {
    this.setState({loading: true});
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    await api
      .get(`/deposits/fixed/${user}`, {headers: {Authorization: token}})
      .then(response => {
        response.data.map(item =>
          this.setState({deposits: [...this.state.deposits, item]}),
        );
      })
      .catch(() =>
        this.setState({
          err: 'Erro ao tentar carregar os dados, tente novamente mais tarde!',
          loading: false,
        }),
      );
  };

  findAllMonthExpenses = async () => {
    this.setState({loading: true});
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    const month = format(new Date(), 'MM');
    const year = format(new Date(), 'yyyy');

    await api
      .get(`/outs/${user}/${month}/${year}`, {
        headers: {Authorization: token},
      })
      .then(response => {
        response.data.map(item =>
          this.setState({expenses: [...this.state.expenses, item]}),
        );
      })
      .catch(() =>
        this.setState({
          err: 'Erro ao tentar carregar os dados, tente novamente mais tarde!',
          loading: false,
        }),
      );
  };

  logOut = async () => {
    await AsyncStorage.multiRemove([
      '@REACTOTRON/clientId',
      '@User',
      '@UserId',
      '@UserToken',
      '@UserTokenLastRefresh',
    ]);
    Notification.cancelAllLocalNotifications();
    this.props.navigation.navigate('Login');
  };

  getUser = async () => {
    const name = await AsyncStorage.getItem('@User');
    this.setState({user: name});
  };

  refresh = async () => {
    this.setState({
      valueOfDeposits: 0,
      valueOfExpenses: 0,
      deposits: [],
      expenses: [],
    });
    await this.getAllDepositsValue();
    await this.getExpensesValue();
    this.calculateBalance();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.lightBlue}
          barStyle="light-content"
        />
        <NavigationEvents
          onDidFocus={async () => {
            const refresh = await AsyncStorage.getItem('@RefreshDashboard');

            if (refresh == 'true') {
              await AsyncStorage.removeItem('@RefreshDashboard');
              this.refresh();
            }
          }}
        />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.title}>Olá, </Text>
            <Text style={styles.name}>{this.state.user}</Text>
            <Text style={styles.title}> !</Text>
            <TouchableOpacity
              onPress={() => this.logOut()}
              style={styles.logOutBtn}>
              <LogOutIcon name="logout" size={10} color={colors.danger} />

              <Text style={styles.logOut}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.err != '' ? (
          <View style={styles.loadingBox}>
            <Text style={styles.error}>{this.state.err}</Text>
          </View>
        ) : this.state.loading ? (
          <View style={styles.loadingBox}>
            <SafeAreaView>
              <Lottie
                speed={2}
                autoPlay
                autoSize
                style={styles.loadingAnimation}
                resizeMode="contain"
                loop
                source={animation}
              />
            </SafeAreaView>
            <Text style={styles.loadingText}>Carregando dados...</Text>
          </View>
        ) : (
          <View style={styles.middleBox}>
            <View />
            <View>
              <Text style={styles.boxTitle}>SALDO</Text>
              <Text
                style={
                  this.state.balance < 0
                    ? styles.negativeValue
                    : styles.positiveValue
                }>
                R$ {this.adjustValue(this.state.balance)}
              </Text>
            </View>
            <View style={styles.informations}>
              <View style={styles.expenses}>
                <Text style={styles.cardText}>Total de entradas:</Text>
                <Text style={styles.cardTextDep}>
                  R$ {this.adjustValue(this.state.valueOfDeposits)}
                </Text>
              </View>
              <View style={styles.deposits}>
                <Text style={styles.cardText}>Total de despesas:</Text>
                <Text style={styles.cardTextEx}>
                  R$ {this.adjustValue(this.state.valueOfExpenses)}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
