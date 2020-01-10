import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {fromRight, zoomIn} from 'react-navigation-transitions';

import {colors} from '~/styles';

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

import Dashboard from './pages/Dashboard/';

import AllDeposits from '~/pages/Dashboard/Deposits/AllDeposits';
import FixedDeposits from '~/pages/Dashboard/Deposits/FixedDeposits';
import IconDeposits from 'react-native-vector-icons/FontAwesome5';
import AddDeposit from '~/pages/Dashboard/Deposits/addDeposit';

import IconExpense from 'react-native-vector-icons/MaterialIcons';
import AddExpense from '~/pages/Dashboard/Expenses/AddExpense';
import AddFixedExpense from '~/pages/Dashboard/Expenses/AddFixedExpense';
import AllFixedExpenses from '~/pages/Dashboard/Expenses/FixedExpenses';
import AllExpenses from './pages/Dashboard/Expenses/AllExpenses';

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
        App: createStackNavigator(
          {
            Dashboard: createMaterialBottomTabNavigator(
              {
                Inicio: {
                  screen: Dashboard,
                  navigationOptions: {tabBarColor: colors.lightBlue},
                },
                Entradas: {
                  screen: createMaterialTopTabNavigator(
                    {
                      Todas: {
                        screen: AllDeposits,
                        navigationOptions: {title: 'Este mês'},
                      },
                      Fixas: {screen: FixedDeposits},
                    },
                    {
                      tabBarOptions: {
                        activeTintColor: colors.white,
                        inactiveTintColor: colors.whiteTransparent,
                        indicatorStyle: {
                          borderColor: colors.white,
                          borderWidth: 1,
                        },
                        tabStyle: {
                          backgroundColor: colors.lightBlue,
                        },
                      },
                    },
                  ),
                  navigationOptions: {
                    tabBarIcon: ({tintColor}) => (
                      <IconDeposits
                        name="hand-holding-usd"
                        size={20}
                        color={tintColor}
                      />
                    ),
                    tabBarColor: colors.darkSuccess,
                  },
                },
                Despesas: {
                  screen: createMaterialTopTabNavigator(
                    {
                      All: {
                        screen: AllExpenses,
                        navigationOptions: {title: 'Este mês'},
                      },
                      FixedExpenses: {
                        screen: AllFixedExpenses,
                        navigationOptions: {title: 'Despesas Fixas'},
                      },
                    },
                    {
                      tabBarOptions: {
                        activeTintColor: colors.white,
                        inactiveTintColor: colors.whiteTransparent,
                        indicatorStyle: {
                          borderColor: colors.white,
                          borderWidth: 1,
                        },
                        tabStyle: {
                          backgroundColor: colors.lightBlue,
                        },
                      },
                    },
                  ),
                  navigationOptions: {
                    tabBarIcon: ({tintColor}) => (
                      <IconExpense
                        name="trending-down"
                        size={20}
                        color={tintColor}
                      />
                    ),
                    tabBarColor: colors.danger,
                  },
                },
              },
              {
                initialRouteName: 'Inicio',
                activeColor: colors.light,
                inactiveColor: colors.whiteTransparent,
                shifting: true,
                barStyle: {
                  backgroundColor: colors.lightBlue,
                },
              },
            ),
            AddDeposit,
            AddFixedExpense,
            AddExpense,
          },
          {
            headerMode: 'none',
            initialRouteName: 'Dashboard',
          },
        ),
      },
      {
        initialRouteName: userLogged ? 'App' : 'Signin',
        headerMode: 'none',
        transitionConfig: () => zoomIn(),
      },
    ),
  );

export default Routes;
