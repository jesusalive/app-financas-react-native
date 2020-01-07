import React, {Component} from 'react';

import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {format, parseISO, subDays} from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import api from '~/services/api';
import {colors} from '~/styles';
import EmptyExpenseList from '~/components/EmptyExpenseList';
import ExpenseItem from '~/pages/Dashboard/Expenses/ExpenseItem';

export default class AllExpenses extends Component {
  state = {
    expenses: [],
    err: '',
    date: new Date(),
    loading: false,
    refreshing: false,
  };

  async componentDidMount() {
    await this.findAllFixedExpenses();
    await this.findAllMonthExpenses();
  }

  findAllMonthExpenses = async () => {
    this.setState({refreshing: true, loading: true});
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    const month = format(this.state.date, 'MM');
    const year = format(this.state.date, 'yyyy');

    await api
      .get(`/outs/${user}/${month}/${year}`, {
        headers: {Authorization: token},
      })
      .then(response => {
        response.data.map(item =>
          this.setState({expenses: [...this.state.expenses, item]}),
        );

        this.setState({loading: false, refreshing: false});
      })
      .catch(() =>
        this.setState({
          err: 'Erro ao tentar carregar os dados, tente novamente mais tarde!',
          loading: false,
          refreshing: false,
        }),
      );
  };

  findAllFixedExpenses = async () => {
    this.setState({refreshing: true, loading: true});
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    await api
      .get(`/outs/fixed/${user}`, {headers: {Authorization: token}})
      .then(response => {
        response.data.map(item =>
          this.setState({expenses: [...this.state.expenses, item]}),
        );

        this.setState({loading: false, refreshing: false});
      })
      .catch(() =>
        this.setState({
          err: 'Erro ao tentar carregar os dados, tente novamente mais tarde!',
        }),
      );
  };

  renderExpense = ({item}) => {
    const day = format(subDays(parseISO(item.date), 1), 'dd');
    const teste = parseFloat(item.value)
      .toFixed(2) // casas decimais
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return (
      <ExpenseItem
        id={item.id}
        status={item.status}
        title={item.reason}
        value={teste}
        date={day}
      />
    );
  };

  refreshHandller = async () => {
    this.setState({expenses: []});
    await this.findAllFixedExpenses();
    await this.findAllMonthExpenses();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.lightBlue}
        />
        {this.state.err != '' ? (
          <Text style={styles.error}>{this.state.err}</Text>
        ) : this.state.loading ? (
          <ActivityIndicator size="large" color={colors.danger} />
        ) : (
          <View>
            <FlatList
              style={styles.expenseList}
              data={this.state.expenses}
              renderItem={item => this.renderExpense(item)}
              keyExtractor={item => String(item.id)}
              ListEmptyComponent={<EmptyExpenseList />}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  progressBackgroundColor={colors.lightBlue}
                  colors={[colors.danger]}
                  onRefresh={() => this.refreshHandller()}
                  refreshing={this.state.refreshing}
                />
              }
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AddExpense')}
              style={styles.addBtn}>
              <Icon name="pluscircle" color={colors.danger} size={40} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
