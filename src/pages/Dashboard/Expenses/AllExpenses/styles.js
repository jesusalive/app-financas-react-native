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

  expenseList: {
    flex: 1,
    marginTop: 0,
    width: metrics.screenWidth / 1.1,
  },

  addBtn: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    tintColor: colors.white,
  },
});

export default styles;
