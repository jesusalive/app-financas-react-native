import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {fromRight, zoomIn} from 'react-navigation-transitions';

import InitialPage from '~/pages/initialPage';
import Login from './pages/Login';
import Forgot from './pages/Login/Forgot';
import ForgotCode from './pages/Login/CheckForgotCode';
import Redefine from './pages/Login/RedefinePass';
import SignUp from './pages/SignUp';
import Name from './pages/SignUp/Name';
import Surname from './pages/SignUp/Surname';
import Email from './pages/SignUp/Email';
import Username from './pages/SignUp/Username';
import Password from './pages/SignUp/Password';
import FinishSign from './pages/SignUp/FinishSign';

import Dashboard from './pages/Dashboard';

const Routes = userLogged =>
  createAppContainer(
    createStackNavigator(
      {
        Signin: createStackNavigator(
          {
            InitialPage,
            Login: createStackNavigator(
              {
                Login,
                Forgot,
                ForgotCode,
                RedefinePassword: {
                  screen: Redefine,
                  navigationOptions: {headerShown: false},
                },
              },
              {
                initialRouteName: 'Login',
                headerMode: 'float',
                headerBackgroundTransitionPreset: 'fade',
                transitionConfig: () => fromRight(),
              },
            ),
            SignUp: createStackNavigator(
              {
                Index: {screen: SignUp},
                Name,
                Surname,
                Email,
                Username,
                Password,
                FinishSign,
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
