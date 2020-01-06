import {StyleSheet} from 'react-native';
import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },

  sectionTitle: {
    textAlign: 'center',
    color: colors.success,
    marginTop: metrics.baseMargin,
  },

  error: {
    color: colors.danger,
    fontSize: 12,
    textAlign: 'center',
  },

  depositsList: {
    flex: 1,
    marginTop: 0,
    width: metrics.screenWidth / 1.1,
  },
});

export default styles;
