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
import {NavigationEvents} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import api from '~/services/api';
import {colors} from '~/styles';
import EmptyList from '~/components/EmptyList';
import DepositItem from '~/pages/Dashboard/Deposits/DepositItem';

export default class AllDeposits extends Component {
  state = {
    deposits: [],
    err: '',
    date: new Date(),
    loading: false,
    refreshing: false,
  };

  findAllMonthDeposits = async () => {
    this.setState({refreshing: true, loading: true});
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    const month = format(this.state.date, 'MM');
    const year = format(this.state.date, 'yyyy');

    await api
      .get(`/deposits/${user}/${month}/${year}`, {
        headers: {Authorization: token},
      })
      .then(response => {
        response.data.map(item =>
          this.setState({deposits: [...this.state.deposits, item]}),
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

  findAllFixedDeposits = async () => {
    this.setState({refreshing: true, loading: true});
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await AsyncStorage.getItem('@UserId');
    await api
      .get(`/deposits/fixed/${user}`, {headers: {Authorization: token}})
      .then(response => {
        response.data.map(item =>
          this.setState({deposits: [...this.state.deposits, item]}),
        );

        this.setState({loading: false, refreshing: false});
      })
      .catch(() =>
        this.setState({
          err: 'Erro ao tentar carregar os dados, tente novamente mais tarde!',
        }),
      );
  };

  renderDeposit = ({item}) => {
    const day = format(subDays(parseISO(item.date), 1), 'dd');
    const teste = parseFloat(item.value)
      .toFixed(2) // casas decimais
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return (
      <DepositItem id={item.id} title={item.reason} value={teste} date={day} />
    );
  };

  refreshHandller = async () => {
    this.setState({deposits: []});
    await this.findAllFixedDeposits();
    await this.findAllMonthDeposits();
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={async () => {
            const refresh = await AsyncStorage.getItem('@RefreshDeposits');

            if (refresh == 'true') {
              await AsyncStorage.removeItem('@RefreshDeposits');
              this.refreshHandller();
            }
          }}
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
              style={styles.depositsList}
              data={this.state.deposits}
              renderItem={item => this.renderDeposit(item)}
              keyExtractor={item => String(item.id)}
              ListEmptyComponent={<EmptyList />}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  progressBackgroundColor={colors.lightBlue}
                  colors={[colors.success]}
                  onRefresh={() => this.refreshHandller()}
                  refreshing={this.state.refreshing}
                />
              }
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AddDeposit')}
              style={styles.addBtn}>
              <Icon name="pluscircle" color={colors.success} size={40} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
