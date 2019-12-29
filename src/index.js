import React, {Component} from 'react';
import './config/Reactotron';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {differenceInDays, format, parseISO} from 'date-fns';

import routesFunction from './routes';
import api from './services/api';

import InitialLoading from '~/pages/InitialLoading';
import NoConnection from '~/pages/NoConnection';

export default class App extends Component {
  state = {
    userLogged: false,
    userChecked: false,
    connected: true,
  };

  verifyUserStatus = async () => {
    const user = await AsyncStorage.getItem('@User');

    this.setState({userChecked: true, userLogged: !!user});
  };

  verifyTokenExpiration = async () => {
    const userToken = await AsyncStorage.getItem('@UserToken');
    const lastRefresh = await AsyncStorage.getItem('@UserTokenLastRefresh');

    if (lastRefresh) {
      const lastRefreshFormated = parseISO(lastRefresh);

      const today = format(new Date(), 'yyyy-MM-dd');
      const todayFormated = parseISO(today);

      if (differenceInDays(lastRefreshFormated, todayFormated) >= 7) {
        api
          .post(
            '/refresh_token',
            {},
            {
              headers: {
                Authorization: userToken,
              },
            },
          )
          .then(async refreshResponse => {
            const token = refreshResponse.headers.authorization;
            await AsyncStorage.setItem('@UserToken', token);
            await AsyncStorage.setItem(
              '@UserTokenLastRefresh',
              format(new Date(), 'yyyy-MM-dd').toString(),
            );
          });
      }
    }
  };

  verifyConnection = () => {
    NetInfo.fetch().then(conectionResponse => {
      if (!conectionResponse.isConnected) {
        this.setState({connected: false});
      }
    });
  };

  componentDidMount() {
    AsyncStorage.clear();
    this.verifyConnection();
    this.verifyTokenExpiration();
    this.verifyUserStatus();
  }

  render() {
    if (!this.state.connected) return <NoConnection />;
    if (!this.state.userChecked) return <InitialLoading />;

    const Routes = routesFunction(this.state.userLogged);
    return <Routes />;
  }
}
