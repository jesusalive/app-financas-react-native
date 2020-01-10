import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
  },

  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  logOut: {
    marginLeft: metrics.baseMargin / 2,
    color: colors.danger,
  },

  logOutBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: metrics.baseMargin,
  },

  title: {
    color: colors.light,
    fontWeight: 'bold',
    fontSize: 20,
  },

  name: {
    textTransform: 'capitalize',
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },

  middleBox: {
    width: metrics.screenWidth / 1.3,
    height: metrics.screenHeight / 2,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginTop: 40,
    borderRadius: metrics.baseRadius * 2,
    backgroundColor: colors.light,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 9,
    },
    shadowOpacity: 1.0,
    shadowRadius: 5,

    elevation: 18,
  },

  loadingBox: {
    width: metrics.screenWidth / 1.3,
    height: metrics.screenHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginTop: 40,
    borderRadius: metrics.baseRadius * 2,
    backgroundColor: colors.light,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 9,
    },
    shadowOpacity: 1.0,
    shadowRadius: 5,

    elevation: 18,
  },

  loadingAnimation: {
    height: 100,
  },

  loadingText: {
    color: colors.darkTransparent,
    marginTop: metrics.baseMargin,
    fontSize: 12,
  },

  boxTitle: {
    color: colors.dark,
    fontWeight: 'bold',
  },

  positiveValue: {
    color: colors.success,
    fontSize: 30,
  },

  negativeValue: {
    color: colors.danger,
    fontSize: 30,
  },

  informations: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  expenses: {
    marginHorizontal: 10,
  },

  deposits: {
    marginHorizontal: 10,
  },

  cardText: {
    fontSize: 10,
    color: colors.dark,
    textAlign: 'center',
  },

  cardTextDep: {
    fontSize: 10,
    color: colors.success,
    textAlign: 'center',
  },

  cardTextEx: {
    fontSize: 10,
    color: colors.danger,
    textAlign: 'center',
  },

  error: {
    fontSize: 10,
    color: colors.danger,
  },
});

export default styles;
