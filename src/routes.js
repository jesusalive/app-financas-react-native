import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {fromRight, zoomIn} from 'react-navigation-transitions';

import InitialPage from '~/pages/initialPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Name from './pages/SignUp/Name';

import Dashboard from './pages/Dashboard';

const Routes = userLogged =>
  createAppContainer(
    createStackNavigator(
      {
        Signin: createStackNavigator(
          {
            InitialPage,
            Login,
            SignUp: createStackNavigator(
              {
                Index: {screen: SignUp},
                Name,
              },
              {
                initialRouteName: 'Index',
                headerMode: 'none',
                transitionConfig: () => fromRight(),
              },
            ),
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
