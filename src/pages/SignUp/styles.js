import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: metrics.basePadding,
  },

  containerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },

  title: {
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },

  icon: {
    margin: 20,
  },

  talk: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 20,
  },
});

export default styles;
