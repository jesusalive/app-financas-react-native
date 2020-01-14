import React, {Component} from 'react';
import './config/Reactotron';
import OneSignal from 'react-native-onesignal';

import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {differenceInDays, format, parseISO} from 'date-fns';

import routesFunction from './routes';
import api from './services/api';

import InitialLoading from '~/pages/InitialLoading';
import NoConnection from '~/pages/NoConnection';

class App extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('8fe7ea8b-2fd9-4b6f-aa3b-2dc3d04e26ec');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  onReceived = data => {};
  onOpened = notification => {};
  onIds = id => {};

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

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

  async componentDidMount() {
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

export default App;
