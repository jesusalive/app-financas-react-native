import React, {Component} from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StatusBar,
  RefreshControl,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {format, parseISO, subDays} from 'date-fns';

import FixedDepositItem from '../FixedDepositItem/index.js';
import EmptyList from '~/components/EmptyList';
import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';
import {NavigationEvents} from 'react-navigation';

export default class FixedDeposits extends Component {
  state = {
    fixedDeposits: [],
    err: '',
    date: new Date(),
    loading: false,
    refreshing: false,
  };

  organizeDeposits = () => {
    this.state.fixedDeposits.sort((item1, item2) => {
      const firstDay = format(subDays(parseISO(item1.date), 1), 'dd');
      const secondDay = format(subDays(parseISO(item2.date), 1), 'dd');

      if (parseInt(firstDay) < parseInt(secondDay)) {
        return -1;
      } else {
        return 1;
      }
    });
  };

  async componentDidMount() {
    await this.findAllFixedDeposits();
  }

  findAllFixedDeposits = async () => {
    if (this.state.loading) return;
    this.setState({refreshing: true, loading: true});
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    await api
      .get(`/deposits/fixed/${user}`, {headers: {Authorization: token}})
      .then(({data}) => {
        this.setState({
          fixedDeposits: data,
          refreshing: false,
          loading: false,
        });
        this.organizeDeposits();
      })
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

    return (
      <FixedDepositItem
        id={item.id}
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
          onDidFocus={async () => this.findAllFixedDeposits()}
        />
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.lightBlue}
        />
        {this.state.err != '' ? (
          <Text style={styles.error}>{this.state.err}</Text>
        ) : this.state.loading ? (
          <ActivityIndicator size="large" color={colors.success} />
        ) : (
          <View>
            <FlatList
              style={styles.fixedDepositsList}
              data={this.state.fixedDeposits}
              renderItem={this.renderFixedDeposit}
              keyExtractor={item => String(item.id)}
              ListEmptyComponent={<EmptyList />}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  progressBackgroundColor={colors.lightBlue}
                  colors={[colors.success]}
                  onRefresh={this.findAllFixedDeposits}
                  refreshing={this.state.refreshing}
                />
              }
            />
          </View>
        )}
      </View>
    );
  }
}
