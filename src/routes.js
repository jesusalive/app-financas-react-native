import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {fromRight, zoomIn} from 'react-navigation-transitions';

import InitialPage from '~/pages/initialPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';

const Routes = userLogged =>
  createAppContainer(
    createStackNavigator(
      {
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
        Dashboard: {screen: Dashboard},
      },
      {
        initialRouteName: userLogged ? 'Dashboard' : 'Signin',
        headerMode: 'none',
        transitionConfig: () => zoomIn(),
      },
    ),
  );

export default Routes;
