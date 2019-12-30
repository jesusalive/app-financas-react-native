import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.secondary,
    paddingTop: getStatusBarHeight(),
    height: 54 + getStatusBarHeight(),
  },

  nameContainer: {
    flexDirection: 'row',
  },

  title: {
    color: colors.lighter,
    fontWeight: 'bold',
    fontSize: 18,
  },

  name: {
    textTransform: 'capitalize',
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;
