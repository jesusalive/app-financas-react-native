import React, {Component} from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {format, parseISO, subDays} from 'date-fns';
import IconAdd from 'react-native-vector-icons/AntDesign';

import FixedExpenseItem from '../FixedExpenseItem/index.js';
import EmptyFixedExpenseList from '~/components/EmptyFixedExpenseList';
import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';
import {NavigationEvents} from 'react-navigation';

export default class FixedExpenses extends Component {
  state = {
    fixedExpenses: [],
    err: '',
    date: new Date(),
    loading: false,
    refreshing: false,
  };

  async componentDidMount() {
    await this.findAllFixedExpenses();
  }

  organizeExpenses = () => {
    this.state.fixedExpenses.sort((item1, item2) => {
      const firstDay = format(subDays(parseISO(item1.date), 1), 'dd');
      const secondDay = format(subDays(parseISO(item2.date), 1), 'dd');

      if (parseInt(firstDay) < parseInt(secondDay)) {
        return -1;
      } else {
        return 1;
      }
    });
  };

  findAllFixedExpenses = async () => {
    this.setState({refreshing: true, loading: true});
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    await api
      .get(`/fixedouts/${user}`, {headers: {Authorization: token}})
      .then(({data}) => {
        this.setState({fixedExpenses: data});
        this.organizeExpenses();
        this.setState({loading: false, refreshing: false});
      })
      .catch(() =>
        this.setState({
          err: 'Erro ao tentar carregar os dados, tente novamente mais tarde!',
        }),
      );
  };

  renderFixedExpense = ({item}) => {
    const day = format(parseISO(item.date), 'dd');
    const teste = parseFloat(item.value)
      .toFixed(2) // casas decimais
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return (
      <FixedExpenseItem
        id={item.id}
        status={item.status}
        title={item.reason}
        value={teste}
        date={day}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={async () => this.findAllFixedExpenses()}
        />
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
              style={styles.fixedExpensesList}
              data={this.state.fixedExpenses}
              renderItem={this.renderFixedExpense}
              keyExtractor={item => String(item.id)}
              ListEmptyComponent={<EmptyFixedExpenseList />}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  progressBackgroundColor={colors.lightBlue}
                  colors={[colors.danger]}
                  onRefresh={this.findAllFixedExpenses}
                  refreshing={this.state.refreshing}
                />
              }
            />
          </View>
        )}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddFixedExpense')}
          style={styles.addBtn}>
          <IconAdd name="pluscircle" color={colors.danger} size={40} />
        </TouchableOpacity>
      </View>
    );
  }
}
