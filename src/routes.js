import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {fromRight} from 'react-navigation-transitions';

import InitialPage from '~/pages/initialPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const Routes = createAppContainer(
  createSwitchNavigator({
    Signin: createStackNavigator(
      {
        InitialPage,
        Login,
        SignUp,
      },
      {
        initialRouteName: 'InitialPage',
        headerMode: 'none',
        transitionConfig: () => fromRight(),
      },
    ),
  }),
);

export default Routes;
