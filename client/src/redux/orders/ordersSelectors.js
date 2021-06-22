import {createSelector} from 'reselect'

const selectOrders = state => state.orders;

export const selectOrder = collectionUrlParam =>
  createSelector(
    [selectOrders],
    orders => 
      orders ? orders[collectionUrlParam] : null
  );

