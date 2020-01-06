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
    flexDirection: 'row',
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

  boxTitle: {
    color: colors.dark,
    fontWeight: 'bold',
  },

  value: {
    color: colors.success,
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
});

export default styles;
