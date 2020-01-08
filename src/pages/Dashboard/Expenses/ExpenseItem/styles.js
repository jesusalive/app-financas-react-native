import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: metrics.basePadding,
    borderColor: colors.danger,
    borderBottomWidth: 1,
    borderRadius: metrics.baseRadius,
    marginVertical: metrics.baseMargin,
  },

  title: {
    color: colors.danger,
  },

  blockItem: {
    width: metrics.screenWidth / 1.5,
    justifyContent: 'flex-start',
    alignContent: 'center',
    flexDirection: 'row',
  },

  blockDescription: {
    width: metrics.screenWidth / 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  descriptionItem: {
    justifyContent: 'center',
    marginRight: metrics.baseMargin,
    marginTop: metrics.baseMargin,
    alignItems: 'center',
    flexDirection: 'row',
  },

  descriptionText: {
    color: colors.lighter,
    fontSize: 10,
  },

  pendingExpense: {
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.pending,
    padding: metrics.basePadding / 3,
    marginHorizontal: metrics.baseMargin,
  },

  paidExpense: {
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.success,
    padding: metrics.basePadding / 3,
    marginHorizontal: metrics.baseMargin,
  },

  expiredExpense: {
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.danger,
    padding: metrics.basePadding / 3,
    marginHorizontal: metrics.baseMargin,
  },

  statusText: {
    color: colors.lighter,
    fontSize: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: metrics.screenWidth / 1.5,
    height: 155,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },

  modalTitle: {
    color: colors.darker,
    textAlign: 'center',
  },

  modalBtns: {
    flexDirection: 'row',
  },

  modalBtn: {
    width: 70,
    height: 35,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.success,
    borderRadius: metrics.baseRadius,
  },

  modalCancelBtn: {
    width: 70,
    height: 35,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.danger,
    borderRadius: metrics.baseRadius,
  },

  modalBtnText: {
    color: colors.lighter,
  },
});

export default styles;
