import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {format, parseISO, setDay} from 'date-fns';

import DepositItem from './DepositItem';
import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';

export default class Deposits extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="hand-holding-usd" size={20} color={tintColor} />
    ),
  };

  state = {
    fixedDeposits: [],
    monthDeposits: [],
    err: '',
    date: new Date(),
    loading: true,
  };

  async componentDidMount() {
    await this.findAllFixedDeposits();
    await this.findAllMonthDeposits();
  }

  findAllMonthDeposits = async () => {
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    const month = format(this.state.date, 'MM');
    const year = format(this.state.date, 'yyyy');

    await api
      .get(`/deposits/${user}/${month}/${year}`, {
        headers: {Authorization: token},
      })
      .then(response =>
        this.setState({monthDeposits: response.data, loading: false}),
      )
      .catch(() =>
        this.setState({
          err: 'Erro ao tentar carregar os dados, tente novamente mais tarde!',
          loading: false,
        }),
      );
  };

  findAllFixedDeposits = async () => {
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    await api
      .get(`/deposits/fixed/${user}`, {headers: {Authorization: token}})
      .then(({data}) => this.setState({fixedDeposits: data}))
      .catch(() =>
        this.setState({
          err: 'Erro ao tentar carregar os dados, tente novamente mais tarde!',
        }),
      );
  };

  renderFixedDeposit = ({item}) => {
    const day = format(parseISO(item.date), 'dd');
    const teste = parseFloat(item.value)
      .toFixed(2) // casas decimais
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return <DepositItem title={item.reason} value={teste} date={day} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.depositsCard}>
          {this.state.err != '' ? (
            <Text style={styles.error}>{this.state.err}</Text>
          ) : this.state.loading ? (
            <ActivityIndicator size="large" color={colors.success} />
          ) : (
            <View>
              <Text style={styles.btnText}>Entradas Fixas</Text>
              <FlatList
                style={styles.fixedDepositsList}
                data={this.state.fixedDeposits}
                renderItem={this.renderFixedDeposit}
                keyExtractor={item => String(item.id)}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddDeposit')}
          style={styles.btn}>
          <Icon name="plus-circle" size={20} color={colors.success} />
          <Text style={styles.btnText}>Adicionar entrada</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
