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

  removedItem: {
    marginLeft: 20,
    color: colors.danger,
    fontSize: 8,
    textAlign: 'center',
  },

  removeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  statusBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    top: -10,
  },

  pending: {
    color: colors.pending,
    fontSize: 10,
  },

  paid: {color: colors.success, fontSize: 10},
  expired: {color: colors.danger, fontSize: 10},

  btnsBlock: {
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: metrics.baseMargin,
  },

  remove: {
    color: colors.danger,
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
